from flask import Flask, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os
from datetime import datetime
import win32api


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:@localhost/test"
app.config['UPLOAD_LOCATION'] = 'E:/FlaskTest/Hack Test/static/'
db = SQLAlchemy(app)
ALLOWED_EXTENSIONS = {'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class Products(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    price = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    image = db.Column(db.String(80), nullable=False)


class Shipping(db.Model):
    __tablename__ = 'shippingdetails'
    name = db.Column(db.String(80), nullable=False)
    mobile = db.Column(db.String(80), nullable=False)
    pincode = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(80), nullable=False)
    city = db.Column(db.String(80), nullable=False)
    district = db.Column(db.String(80), nullable=False)


@app.route('http://localhost:3000/checkout/address', methods=["GET", "POST"])
def shipping():
    if request.method == "POST":
        name = request.form.get("name")
        mobile = request.form.get("mobile")
        pincode = request.form.get("pincode")
        address = request.form.get("address")
        city = request.form.get("city")
        district = request.form.get("district")
        shipment = Shipping(name=name, mobile=mobile, pincode=pincode,
                            address=address, city=city, district=district)
        db.session.add(shipment)
        db.session.commit()
    return redirect("http://localhost:3000/checkout/address")


@app.route('/category/<string:cat>')
def category(cat):
    prods = Products.query.filter_by(category=cat)
    ans = []
    content = {}
    for prod in prods:
        content = {'id': prod.id, 'title': prod.title, 'price': prod.price, 'description': prod.description,
                   'category': prod.category, 'image': prod.image}
        ans.append(content)
        content = {}
    return jsonify(ans)


@app.route('/products')
def products():
    prods = Products.query.all()
    ans = []
    content = {}
    for prod in prods:
        content = {'id': prod.id, 'title': prod.title, 'price': prod.price,
                   'description': prod.description, 'category': prod.category, 'image': prod.image}
        ans.append(content)
        content = {}
    return jsonify(ans)


@app.route('/addProduct', methods=["GET", "POST"])
def addproducts():
    if request.method == "POST":
        title = request.form.get('name')
        price = request.form.get('price')
        description = request.form.get('description')
        category = request.form.get('category')
        f = request.files['pic']
        if not f:
            return "No picture found", 400
        if allowed_file(f.filename):
            now = datetime.now()
            dt_string = now.strftime("%d-%m-%Y-%H-%M-%S")
            name = dt_string + secure_filename(f.filename)
            f.save(os.path.join(app.config['UPLOAD_LOCATION'], name))
            img = name
            prod = Products(title=title, price=price,
                            description=description, category=category, image=img)
            db.session.add(prod)
            db.session.commit()
        else:
            win32api.MessageBox(0, 'hello', 'title')
    return render_template('seller.php')


if __name__ == '__main__':
    app.run()
