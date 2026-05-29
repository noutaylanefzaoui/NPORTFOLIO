import os
import sqlite3
import unittest
from unittest import mock
from app import app, DB_PATH

class FlaskBackendTestCase(unittest.TestCase):
    def setUp(self):
        # Configure app for testing
        app.config["TESTING"] = True
        self.previous_mail_suppress = app.config.get("MAIL_SUPPRESS_SEND")
        app.config["MAIL_SUPPRESS_SEND"] = True
        self.client = app.test_client()
        
        # Make sure database is clean for tests
        if os.path.exists(DB_PATH):
            os.remove(DB_PATH)
        
        # Re-initialize DB
        from app import init_db
        init_db()

    def tearDown(self):
        if self.previous_mail_suppress is None:
            app.config.pop("MAIL_SUPPRESS_SEND", None)
        else:
            app.config["MAIL_SUPPRESS_SEND"] = self.previous_mail_suppress

        # Clean up database after tests
        if os.path.exists(DB_PATH):
            os.remove(DB_PATH)

    def test_portfolio_data_route(self):
        """Test that GET /api/portfolio-data returns all CV information as JSON."""
        response = self.client.get("/api/portfolio-data")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, "application/json")
        
        data = response.get_json()
        self.assertIsNotNone(data)
        self.assertEqual(data["profile"]["name"], "Noutayla Nefzaoui")
        self.assertIn("Java", data["skills"]["it"])
        self.assertIn("SEO Basics", data["skills"]["marketing"])

    def test_contact_form_success(self):
        """Test successful contact form submission saves in database."""
        test_data = {
            "name": "Jane Doe",
            "email": "janedoe@example.com",
            "subject": "Inquiry on IT Portfolio",
            "message": "Hello Noutayla, this is an automated testing message."
        }
        response = self.client.post("/api/contact", json=test_data)
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Thank you! Your message has been sent.", response.data)

        # Check database contents
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM messages WHERE email = ?", ("janedoe@example.com",))
        row = cursor.fetchone()
        conn.close()

        self.assertIsNotNone(row)
        self.assertEqual(row[1], "Jane Doe") # name
        self.assertEqual(row[2], "janedoe@example.com") # email
        self.assertEqual(row[3], "Inquiry on IT Portfolio") # subject
        self.assertEqual(row[4], "Hello Noutayla, this is an automated testing message.") # message

    def test_contact_form_delivery_config_error_still_saves_message(self):
        """Test that SMTP misconfiguration is reported while keeping the database backup."""
        app.config["MAIL_SUPPRESS_SEND"] = False
        test_data = {
            "name": "SMTP Tester",
            "email": "smtp-test@example.com",
            "subject": "Delivery check",
            "message": "This should be saved even when SMTP settings are missing."
        }

        with mock.patch.dict(os.environ, {
            "MAIL_SUPPRESS_SEND": "",
            "SMTP_USERNAME": "",
            "SMTP_PASSWORD": ""
        }):
            response = self.client.post("/api/contact", json=test_data)

        self.assertEqual(response.status_code, 500)
        self.assertIn(b"email delivery failed", response.data.lower())

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM messages WHERE email = ?", ("smtp-test@example.com",))
        row = cursor.fetchone()
        conn.close()

        self.assertIsNotNone(row)
        self.assertEqual(row[1], "SMTP Tester")

    def test_contact_form_missing_fields(self):
        """Test that form rejects missing fields with 400 Bad Request."""
        test_data = {
            "name": "",
            "email": "test@example.com",
            "message": ""
        }
        response = self.client.post("/api/contact", json=test_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn(b"Name, email, and message are required fields.", response.data)

    def test_contact_form_invalid_email(self):
        """Test that form rejects invalid email addresses with 400 Bad Request."""
        test_data = {
            "name": "John Smith",
            "email": "invalid-email-address",
            "message": "Valid message"
        }
        response = self.client.post("/api/contact", json=test_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn(b"Please enter a valid email address.", response.data)

    def test_contact_form_too_long_message(self):
        """Test that form rejects messages that are too long."""
        test_data = {
            "name": "John Smith",
            "email": "john@example.com",
            "message": "A" * 1501
        }
        response = self.client.post("/api/contact", json=test_data)
        self.assertEqual(response.status_code, 400)
        self.assertIn(b"Message is too long", response.data)

if __name__ == "__main__":
    unittest.main()
