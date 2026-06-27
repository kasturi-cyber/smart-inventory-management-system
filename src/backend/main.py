import sqlite3

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

conn = sqlite3.connect("inventory.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact TEXT NOT NULL
)
""")

conn.commit()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Product(BaseModel):
    name: str
    quantity: int
    price: float

class Supplier(BaseModel):
    name: str
    contact: str    

@app.get("/")
def home():
    return {"message": "Smart Inventory Backend Running"}

@app.get("/products")
def get_products():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()

    products = []

    for row in rows:
        products.append({
            "id": row[0],
            "name": row[1],
            "quantity": row[2],
            "price": row[3]
        })

    return products

@app.get("/suppliers")
def get_suppliers():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM suppliers")
    rows = cursor.fetchall()

    suppliers = []

    for row in rows:
        suppliers.append({
            "id": row[0],
            "name": row[1],
            "contact": row[2]
        })

    return suppliers

@app.post("/suppliers")
def add_supplier(supplier: Supplier):
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO suppliers (name, contact)
        VALUES (?, ?)
        """,
        (supplier.name, supplier.contact)
    )

    conn.commit()

    supplier_id = cursor.lastrowid

    return {
        "message": "Supplier added successfully",
        "supplier": {
            "id": supplier_id,
            "name": supplier.name,
            "contact": supplier.contact
        }
    }
@app.delete("/suppliers/{supplier_id}")
def delete_supplier(supplier_id: int):
    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM suppliers
        WHERE id = ?
        """,
        (supplier_id,)
    )

    conn.commit()

    return {"message": "Supplier deleted successfully"}

@app.put("/suppliers/{supplier_id}")
def update_supplier(supplier_id: int, updated_supplier: Supplier):
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE suppliers
        SET name = ?, contact = ?
        WHERE id = ?
        """,
        (
            updated_supplier.name,
            updated_supplier.contact,
            supplier_id
        )
    )

    conn.commit()

    return {
        "message": "Supplier updated successfully",
        "supplier": {
            "id": supplier_id,
            "name": updated_supplier.name,
            "contact": updated_supplier.contact
        }
    }

@app.post("/products")
def add_product(product: Product):
    cursor = conn.cursor()
    cursor.execute(
        """
        INSERT INTO products (name, quantity, price)
        VALUES (?, ?, ?)
        """,
        (product.name, product.quantity, product.price)
    )

    conn.commit() 

    product_id = cursor.lastrowid

    return {
        "message": "Product added successfully",
        "product": {
            "id": product_id,
            "name": product.name,
            "quantity": product.quantity,
            "price": product.price
        }
    }

@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    cursor = conn.cursor()
    cursor.execute(
        """
        DELETE FROM products
        WHERE id = ?
        """,
        (product_id,)
    )

    conn.commit()

    return {"message": "Product deleted successfully"}

@app.put("/products/{product_id}")
def update_product(product_id: int, updated_product: Product):
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE products
        SET name = ?, quantity = ?, price = ?
        WHERE id = ?
        """,
        (
            updated_product.name,
            updated_product.quantity,
            updated_product.price,
            product_id
        )
    )

    conn.commit()

    return {
        "message": "Product updated successfully",
        "product": {
            "id": product_id,
            "name": updated_product.name,
            "quantity": updated_product.quantity,
            "price": updated_product.price,
        }
    }



    return {"message": "Product not found"}   

@app.get("/stock-alerts")
def get_stock_alerts():
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM products
        WHERE quantity < 5
    """)

    rows = cursor.fetchall()

    alerts = []

    for row in rows:
        alerts.append({
            "id": row[0],
            "name": row[1],
            "quantity": row[2],
            "price": row[3]
        })

    return alerts


@app.get("/dashboard-stats")
def dashboard_stats():
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM products")
    total_products = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM suppliers")
    total_suppliers = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM products WHERE quantity < 5")
    low_stock = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM products WHERE quantity = 0")
    out_of_stock = cursor.fetchone()[0]

    cursor.execute("SELECT SUM(quantity * price) FROM products")
    inventory_value = cursor.fetchone()[0]

    if inventory_value is None:
        inventory_value = 0

    return {
        "total_products": total_products,
        "total_suppliers": total_suppliers,
        "low_stock": low_stock,
        "out_of_stock": out_of_stock,
        "inventory_value": inventory_value
    }