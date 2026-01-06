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

@app.route('/api/events', methods=['POST'])
def create_event():
    try:
        title = request.form.get('title')
        date = request.form.get('date')
        description = request.form.get('description')
        category = request.form.get('category', 'evento')
        featured = request.form.get('featured') == 'true'
        
        image_url = None
        if 'file' in request.files:
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"{timestamp}_{filename}"
                save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'events')
                if not os.path.exists(save_path): os.makedirs(save_path)
                file.save(os.path.join(save_path, filename))
                image_url = f"/uploads/events/{filename}"
        
        new_event = Event(
            title=title,
            date=date,
            description=description,
            category=category,
            featured=featured,
            image=image_url
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify({'status': 'success', 'event': new_event.to_dict()}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    try:
        event = Event.query.get(event_id)
        if not event:
            return jsonify({'status': 'error', 'message': 'Event not found'}), 404
            
        event.title = request.form.get('title', event.title)
        event.date = request.form.get('date', event.date)
        event.description = request.form.get('description', event.description)
        event.category = request.form.get('category', event.category)
        event.featured = request.form.get('featured') == 'true'
        
        if 'file' in request.files:
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"{timestamp}_{filename}"
                save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'events')
                if not os.path.exists(save_path): os.makedirs(save_path)
                file.save(os.path.join(save_path, filename))
                event.image = f"/uploads/events/{filename}"
                
        db.session.commit()
        return jsonify({'status': 'success', 'event': event.to_dict()})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    try:
        event = Event.query.get(event_id)
        if not event:
            return jsonify({'status': 'error', 'message': 'Event not found'}), 404
        db.session.delete(event)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Event deleted'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    try:
        items = GalleryItem.query.order_by(GalleryItem.created_at.desc()).all()
        return jsonify({'status': 'success', 'items': [i.to_dict() for i in items]})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/gallery', methods=['POST'])
def create_gallery_item():
    try:
        if 'file' not in request.files:
            return jsonify({'status': 'error', 'message': 'No file sent'}), 400
        
        file = request.files['file']
        event_id = request.form.get('event_id')
        year = request.form.get('year')
        item_type = request.form.get('type', 'image')
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{timestamp}_{filename}"
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'gallery')
            if not os.path.exists(save_path): os.makedirs(save_path)
            file.save(os.path.join(save_path, filename))
            
            new_item = GalleryItem(
                src=f"/uploads/gallery/{filename}",
                alt=filename,
                event_id=event_id,
                year=year,
                type=item_type
            )
            db.session.add(new_item)
            db.session.commit()
            return jsonify({'status': 'success', 'item': new_item.to_dict()}), 201
        return jsonify({'status': 'error', 'message': 'Invalid file type'}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/gallery/bulk', methods=['POST'])
def create_gallery_bulk():
    try:
        files = request.files.getlist('files[]')
        event_id = request.form.get('event_id')
        year = request.form.get('year')
        item_type = request.form.get('type', 'image')
        
        success_count = 0
        failed = []
        
        for file in files:
            if file and allowed_file(file.filename):
                try:
                    filename = secure_filename(file.filename)
                    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                    filename = f"{timestamp}_{filename}"
                    save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'gallery')
                    if not os.path.exists(save_path): os.makedirs(save_path)
                    file.save(os.path.join(save_path, filename))
                    
                    new_item = GalleryItem(
                        src=f"/uploads/gallery/{filename}",
                        alt=filename,
                        event_id=event_id,
                        year=int(year),
                        type=item_type
                    )
                    db.session.add(new_item)
                    success_count += 1
                except Exception as e:
                    failed.append({'filename': file.filename, 'error': str(e)})
            else:
                failed.append({'filename': file.filename, 'error': 'Invalid file type'})
        
        db.session.commit()
        return jsonify({
            'status': 'success',
            'success_count': success_count,
            'failed_count': len(failed),
            'failed': failed
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/gallery/<int:item_id>', methods=['DELETE'])
def delete_gallery_item(item_id):
    try:
        item = GalleryItem.query.get(item_id)
        if not item:
            return jsonify({'status': 'error', 'message': 'Item not found'}), 404
        db.session.delete(item)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Item deleted'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/sponsors', methods=['GET'])
def get_sponsors():
    try:
        sponsors = Sponsor.query.order_by(Sponsor.tier.asc()).all()
        return jsonify({'status': 'success', 'sponsors': [s.to_dict() for s in sponsors]})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/sponsors', methods=['POST'])
def create_sponsor():
    try:
        if 'file' not in request.files:
            return jsonify({'status': 'error', 'message': 'No logo sent'}), 400
        
        file = request.files['file']
        name = request.form.get('name')
        tier = request.form.get('tier')
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{timestamp}_{filename}"
            
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'sponsors')
            if not os.path.exists(save_path): os.makedirs(save_path)
            
            file.save(os.path.join(save_path, filename))
            
            new_sponsor = Sponsor(
                name=name,
                logo=f"/uploads/sponsors/{filename}",
                tier=tier
            )
            db.session.add(new_sponsor)
            db.session.commit()
            
            return jsonify({'status': 'success', 'sponsor': new_sponsor.to_dict()}), 201
        return jsonify({'status': 'error', 'message': 'Invalid file type'}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/sponsors/<int:sponsor_id>', methods=['DELETE'])
def delete_sponsor(sponsor_id):
    try:
        sponsor = Sponsor.query.get(sponsor_id)
        if not sponsor:
            return jsonify({'status': 'error', 'message': 'Sponsor not found'}), 404
        
        db.session.delete(sponsor)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Sponsor deleted'})
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

@app.route('/api/hero-settings/video', methods=['PUT'])
def update_hero_video():
    try:
        if 'file' not in request.files:
            return jsonify({'status': 'error', 'message': 'No video sent'}), 400
        
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"hero_{timestamp}_{filename}"
            
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'hero')
            if not os.path.exists(save_path): os.makedirs(save_path)
            
            file.save(os.path.join(save_path, filename))
            
            settings = HeroSettings.query.first()
            settings.hero_video = f"/uploads/hero/{filename}"
            db.session.commit()
            
            return jsonify({'status': 'success', 'url': settings.hero_video})
        return jsonify({'status': 'error', 'message': 'Invalid file type'}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/hero-settings/event-date', methods=['PUT'])
def update_event_date():
    try:
        data = request.get_json()
        event_date = data.get('eventDate')
        
        settings = HeroSettings.query.first()
        settings.event_date = event_date
        db.session.commit()
        
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/event-info', methods=['GET'])
def get_event_info():
    try:
        settings = HeroSettings.query.first()
        if not settings:
            return jsonify({'status': 'success', 'eventDate': '2025-08-10T06:00:00'})
        return jsonify({'status': 'success', 'eventDate': settings.event_date})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    try:
        # Aquí podrías calcular estadísticas reales
        stats = {
            'total_events': Event.query.count(),
            'total_gallery': GalleryItem.query.count(),
            'total_sponsors': Sponsor.query.count()
        }
        return jsonify({'status': 'success', 'stats': stats})
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
