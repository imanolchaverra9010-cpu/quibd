from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

# Cargar variables de entorno
load_dotenv()
IS_PROD = os.environ.get('RENDER') is not None

app = Flask(__name__, static_folder='dist', static_url_path='')
CORS(app)

# Configuración de carpetas
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov', 'avi'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ==================== CONFIGURACIÓN DE BASE DE DATOS (MYSQL) ====================

user = "u659323332_mmq"
password = quote_plus("Mmq23456*")
host = "82.197.82.29"
database = "u659323332_mmq"

# Conexión directa usando mysql-connector
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{user}:{password}@{host}/{database}"

app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "pool_pre_ping": True,
    "pool_recycle": 280,
}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialización de SQLAlchemy
db = SQLAlchemy(app)

# ==================== MODELOS ====================

class EventSetting(db.Model):
    __tablename__ = 'event_settings'
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(255), nullable=False)
    event_date = db.Column(db.DateTime, nullable=False)
    is_active = db.Column(db.Boolean, default=True)

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    date = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(500))
    category = db.Column(db.String(50), default='evento')
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'date': self.date,
            'description': self.description,
            'image': self.image,
            'category': self.category,
            'featured': self.featured,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class GalleryItem(db.Model):
    __tablename__ = 'gallery_items'
    id = db.Column(db.Integer, primary_key=True)
    src = db.Column(db.String(500), nullable=False)
    alt = db.Column(db.String(255), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(50), default='image')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    event = db.relationship('Event', backref='gallery_items')

    def to_dict(self):
        return {
            'id': str(self.id),
            'src': self.src,
            'alt': self.alt,
            'event': self.event.title if self.event else '',
            'event_id': self.event_id,
            'year': self.year,
            'type': self.type,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class HeroSettings(db.Model):
    __tablename__ = 'hero_settings'
    id = db.Column(db.Integer, primary_key=True)
    hero_video = db.Column(db.String(500))
    event_date = db.Column(db.String(100))
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'heroVideo': self.hero_video,
            'eventDate': self.event_date,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Sponsor(db.Model):
    __tablename__ = 'sponsors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    logo = db.Column(db.String(500), nullable=False)
    tier = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'logo': self.logo,
            'tier': self.tier,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

# ==================== RUTAS DE ARCHIVOS ====================

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/upload/<category>', methods=['POST'])
def upload_file(category):
    try:
        if 'file' not in request.files:
            return jsonify({'status': 'error', 'message': 'No file sent'}), 400
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{timestamp}_{filename}"
            
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], category)
            if not os.path.exists(save_path): os.makedirs(save_path)
            
            file.save(os.path.join(save_path, filename))
            return jsonify({'status': 'success', 'url': f"/uploads/{category}/{filename}"}), 201
        return jsonify({'status': 'error', 'message': 'Invalid file type'}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# ==================== RUTAS DE API ====================

@app.route('/api/events', methods=['GET'])
def get_events():
    try:
        events = Event.query.order_by(Event.created_at.desc()).all()
        return jsonify({'status': 'success', 'events': [e.to_dict() for e in events]})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    try:
        items = GalleryItem.query.order_by(GalleryItem.created_at.desc()).all()
        return jsonify({'status': 'success', 'items': [i.to_dict() for i in items]})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/hero-settings', methods=['GET'])
def get_hero_settings():
    try:
        settings = HeroSettings.query.first()
        if not settings:
            settings = HeroSettings(hero_video='', event_date='2025-08-10T06:00:00')
            db.session.add(settings)
            db.session.commit()
        return jsonify({'status': 'success', 'settings': settings.to_dict()})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    if data.get('password') == 'mmq2025admin':
        return jsonify({'status': 'success', 'isAdmin': True})
    return jsonify({'status': 'error', 'message': 'Unauthorized'}), 401

# ==================== INICIALIZACIÓN ====================

def init_db():
    with app.app_context():
        db.create_all()
        if not HeroSettings.query.first():
            db.session.add(HeroSettings(hero_video='', event_date='2025-08-10T06:00:00'))
        if not EventSetting.query.first():
            db.session.add(EventSetting(
                event_name='Media Maratón de Quibdó 2025',
                event_date=datetime(2025, 8, 10, 6, 0, 0)
            ))
        db.session.commit()
        print("✅ Base de Datos MySQL inicializada")

# ==================== MANEJO DE ERRORES & RUN ====================

@app.errorhandler(404)
def not_found(error):
    if request.path.startswith('/api/'):
        return jsonify({'status': 'error', 'message': 'API route not found'}), 404
    if os.path.exists(os.path.join(app.static_folder, 'index.html')):
        return send_from_directory(app.static_folder, 'index.html')
    return "Frontend not found", 404

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=not IS_PROD, port=port, host='0.0.0.0')