import sqlite3
import os

db_paths = [
    "./parivar.db",
    "./backend/parivar.db",
    "../parivar.db"
]

def migrate():
    for path in db_paths:
        if not os.path.exists(path):
            continue
        print(f"Checking database: {path}")
        try:
            conn = sqlite3.connect(path)
            cursor = conn.cursor()
            
            # Check if column is_sent exists in bills table
            cursor.execute("PRAGMA table_info(bills)")
            columns = cursor.fetchall()
            column_names = [col[1] for col in columns]
            
            if "is_sent" not in column_names:
                print(f"Adding is_sent column to bills table in {path}")
                cursor.execute("ALTER TABLE bills ADD COLUMN is_sent BOOLEAN DEFAULT 0 NOT NULL")
                conn.commit()
                print("Column added successfully.")
            else:
                print(f"is_sent column already exists in {path}")
                
            conn.close()
        except Exception as e:
            print(f"Error migrating {path}: {e}")

if __name__ == "__main__":
    migrate()
