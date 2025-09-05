import React, { useState, useEffect } from 'react';
import { Upload, Play, Trophy, User, Home, LogOut, ThumbsUp, Video, Star, TrendingUp, CheckCircle, Clock, XCircle, Loader2, ChevronRight, Award, Users, MapPin, Calendar, Eye, Filter, BarChart3, Shield } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [selectedCity, setSelectedCity] = useState('todas');
  const [videos, setVideos] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState(null);
  const [votedVideos, setVotedVideos] = useState(new Set());

  // Ciudades disponibles
  const cities = ['Todas', 'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira'];
  
  // Simular carga inicial de datos
  useEffect(() => {
    const mockVideos = [
      { id: 1, playerName: 'Carlos Rodríguez', city: 'Bogotá', votes: 2542, status: 'processed', thumbnail: '🏀', position: 'Base', age: 19 },
      { id: 2, playerName: 'María González', city: 'Medellín', votes: 2389, status: 'processed', thumbnail: '⭐', position: 'Escolta', age: 17 },
      { id: 3, playerName: 'Juan Pérez', city: 'Cali', votes: 2156, status: 'processed', thumbnail: '🔥', position: 'Alero', age: 18 },
      { id: 4, playerName: 'Ana Martínez', city: 'Barranquilla', votes: 1998, status: 'processing', thumbnail: '💪', position: 'Pívot', age: 20 },
      { id: 5, playerName: 'Luis Torres', city: 'Cartagena', votes: 1845, status: 'processed', thumbnail: '🎯', position: 'Ala-Pívot', age: 19 },
      { id: 6, playerName: 'Sofia Ramírez', city: 'Bogotá', votes: 1723, status: 'processed', thumbnail: '✨', position: 'Base', age: 18 },
      { id: 7, playerName: 'Diego López', city: 'Medellín', votes: 1612, status: 'processed', thumbnail: '🌟', position: 'Escolta', age: 17 },
      { id: 8, playerName: 'Valentina Castro', city: 'Bucaramanga', votes: 1498, status: 'processed', thumbnail: '🏆', position: 'Alero', age: 19 },
    ];
    setVideos(mockVideos);
    setRankings(mockVideos.sort((a, b) => b.votes - a.votes));
  }, []);

  // Componente de navegación principal
  const Navigation = () => (
    <nav className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">🏀</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">ANB Rising Stars</h1>
              <p className="text-xs opacity-90">Showcase 2025</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 md:space-x-6">
            {user && (
              <>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-orange-200 transition-colors flex items-center space-x-1"
                >
                  <Home size={20} />
                  <span className="hidden md:inline">Inicio</span>
                </button>
                <button
                  onClick={() => setCurrentView('upload')}
                  className="hover:text-orange-200 transition-colors flex items-center space-x-1"
                >
                  <Upload size={20} />
                  <span className="hidden md:inline">Subir</span>
                </button>
                <button
                  onClick={() => setCurrentView('videos')}
                  className="hover:text-orange-200 transition-colors flex items-center space-x-1"
                >
                  <Video size={20} />
                  <span className="hidden md:inline">Videos</span>
                </button>
                <button
                  onClick={() => setCurrentView('rankings')}
                  className="hover:text-orange-200 transition-colors flex items-center space-x-1"
                >
                  <Trophy size={20} />
                  <span className="hidden md:inline">Rankings</span>
                </button>
              </>
            )}
            
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center space-x-2 hover:text-orange-200"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="hidden md:inline text-sm">{user.name}</span>
                </button>
                <button
                  onClick={() => {
                    setUser(null);
                    setCurrentView('landing');
                  }}
                  className="bg-white/20 backdrop-blur p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('login')}
                className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  // Landing Page mejorada
  const LandingPage = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const features = [
      { icon: Upload, title: 'Sube tu Video', desc: 'Muestra tus mejores jugadas en 30 segundos' },
      { icon: Users, title: 'Votación Pública', desc: 'El público decide quiénes son los mejores' },
      { icon: Award, title: 'Clasificación', desc: 'Los más votados de cada ciudad clasifican' },
      { icon: Star, title: 'Showcase Final', desc: 'Compite frente a cazatalentos profesionales' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-600 to-orange-400">

          <div className="relative">
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center text-white">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 animate-pulse">
                  RISING STARS
                </h1>
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                  SHOWCASE 2025
                </div>
              </div>
              
              <p className="text-lg md:text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                ¿Tienes lo que se necesita para ser la próxima estrella del baloncesto nacional? 
                Demuestra tu talento y compite por un lugar en el torneo más importante del año.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button
                  onClick={() => setCurrentView('login')}
                  className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-orange-500/50"
                >
                  <Play className="inline mr-2 group-hover:animate-pulse" />
                  Comenzar Ahora
                </button>
                <button
                  onClick={() => setCurrentView('rankings')}
                  className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-bold shadow-2xl transform transition-all duration-300 hover:scale-110"
                >
                  <Trophy className="inline mr-2 group-hover:animate-bounce" />
                  Ver Rankings
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mt-16">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setActiveFeature(index)}
                      className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform transition-all duration-500 cursor-pointer ${
                        activeFeature === index ? 'scale-110 bg-white/20' : 'hover:scale-105'
                      }`}
                    >
                      <Icon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="opacity-80 text-sm">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-16 p-8 bg-white/10 backdrop-blur-lg rounded-3xl">
                <h2 className="text-3xl font-bold mb-6">🏆 Premios y Beneficios</h2>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2 text-orange-400">Exposición Nacional</h3>
                    <p className="text-sm opacity-80">Muéstrate ante cazatalentos de equipos profesionales</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2 text-orange-400">Entrenamiento Elite</h3>
                    <p className="text-sm opacity-80">Acceso a sesiones con entrenadores profesionales</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2 text-orange-400">Contratos Profesionales</h3>
                    <p className="text-sm opacity-80">Oportunidad de firmar con equipos de la liga</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Sistema de Login/Registro mejorado
  const LoginView = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
      city: '',
      position: '',
      age: '',
      phone: ''
    });

    const handleSubmit = () => {
      if (formData.email && formData.password) {
        setUser({ 
          name: formData.name || 'Jugador',
          email: formData.email,
          city: formData.city || 'Bogotá'
        });
        setCurrentView('dashboard');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-orange-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
            <h2 className="text-3xl font-bold text-center">
              {isLogin ? 'Bienvenido de vuelta' : 'Únete a Rising Stars'}
            </h2>
            <p className="text-center mt-2 opacity-90">
              {isLogin ? 'Ingresa para ver tu progreso' : 'Comienza tu camino al estrellato'}
            </p>
          </div>
          
          <div className="p-8 space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Nombre completo *"
                  className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Edad *"
                    min="14"
                    max="25"
                    className="p-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="p-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <select
                  className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                >
                  <option value="">Selecciona tu ciudad *</option>
                  {cities.slice(1).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <select
                  className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                >
                  <option value="">Posición de juego *</option>
                  <option value="base">Base (PG)</option>
                  <option value="escolta">Escolta (SG)</option>
                  <option value="alero">Alero (SF)</option>
                  <option value="ala-pivot">Ala-Pívot (PF)</option>
                  <option value="pivot">Pívot (C)</option>
                </select>
              </>
            )}
            
            <input
              type="email"
              placeholder="Correo electrónico *"
              className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            
            <input
              type="password"
              placeholder="Contraseña *"
              className="w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />

            {!isLogin && (
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" />
                <p>Acepto los términos y condiciones y autorizo el uso de mi imagen para fines promocionales del torneo</p>
              </div>
            )}
            
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
            >
              {isLogin ? 'Ingresar' : 'Crear Cuenta'}
            </button>
          </div>
          
          <div className="pb-6 text-center">
            <p className="text-gray-600">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-600 font-bold ml-2 hover:underline"
              >
                {isLogin ? 'Regístrate' : 'Inicia Sesión'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard mejorado
  const Dashboard = () => {
    const stats = [
      { label: 'Votos Totales', value: '1,847', change: '+234', icon: ThumbsUp, color: 'from-orange-500 to-red-500' },
      { label: 'Ranking Ciudad', value: '#8', change: '↑ 3', icon: Trophy, color: 'from-purple-500 to-pink-500' },
      { label: 'Vistas del Video', value: '3.2K', change: '+512', icon: Eye, color: 'from-blue-500 to-cyan-500' },
      { label: 'Días Restantes', value: '14', change: '', icon: Calendar, color: 'from-green-500 to-emerald-500' }
    ];

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Hola, {user?.name} 👋
            </h1>
            <p className="text-gray-600">Este es tu panel de control para Rising Stars Showcase 2025</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all"
                >
                  <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-8 h-8 text-gray-400" />
                      {stat.change && (
                        <span className={`text-sm font-bold ${stat.change.includes('+') || stat.change.includes('↑') ? 'text-green-500' : 'text-gray-500'}`}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <Video className="mr-2" />
                Tu Video de Competencia
              </h3>
              <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="relative z-10 text-white text-center">
                  <div className="text-6xl mb-4">🏀</div>
                  <p className="text-lg font-semibold mb-2">Video Procesado</p>
                  <button className="bg-white/20 backdrop-blur px-6 py-2 rounded-full hover:bg-white/30 transition-colors">
                    <Play className="inline mr-2" size={16} />
                    Reproducir
                  </button>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  APROBADO
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>Duración: 30 segundos</span>
                <span>Calidad: HD 1080p</span>
                <span>Marca de agua: ANB ✓</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <BarChart3 className="mr-2" />
                Tu Progreso
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Objetivo de votos</span>
                    <span className="font-bold">1,847 / 3,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all" style={{ width: '62%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">Posición en tu ciudad</p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-orange-600">#8</div>
                    <div className="text-sm text-gray-500">de 156 participantes</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Compartir para más votos:</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                      Facebook
                    </button>
                    <button className="flex-1 bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                      X
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
                      Instagram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Videos Destacados para Votar</h3>
              <button
                onClick={() => setCurrentView('videos')}
                className="text-orange-600 hover:text-orange-700 font-semibold flex items-center"
              >
                Ver todos
                <ChevronRight className="ml-1" size={20} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.slice(0, 3).map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Sistema de carga de videos
  const UploadVideo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    };

    const handleFileSelect = (file) => {
      if (file && file.type.startsWith('video/')) {
        setSelectedFile(file);
        setProcessingStatus(null);
      }
    };

    const handleUpload = () => {
      setUploading(true);
      setProcessingStatus('uploading');
      setUploadProgress(0);
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        setUploadProgress(Math.round(progress));
        
        if (progress >= 100) {
          clearInterval(interval);
          setProcessingStatus('processing');
          
          setTimeout(() => {
            setProcessingStatus('completed');
            setUploading(false);
          }, 3000);
        }
      }, 500);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Sube tu Video de Prueba</h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Requisitos del Video</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Duración máxima: 30 segundos</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Formato: MP4, MOV, AVI</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Resolución mínima: 720p</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Tamaño máximo: 500MB</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              {!selectedFile && !processingStatus && (
                <div
                  className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all ${
                    dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-20 h-20 mx-auto mb-4 text-gray-400" />
                  <p className="text-2xl mb-2 text-gray-700">Arrastra tu video aquí</p>
                  <p className="text-gray-500 mb-4">o</p>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                      className="hidden"
                    />
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all inline-block">
                      Seleccionar archivo
                    </span>
                  </label>
                </div>
              )}

              {selectedFile && !uploading && !processingStatus && (
                <div className="text-center">
                  <Video className="w-20 h-20 mx-auto mb-4 text-orange-500" />
                  <p className="text-xl mb-2 text-gray-700 font-semibold">{selectedFile.name}</p>
                  <p className="text-gray-500 mb-6">
                    Tamaño: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cambiar archivo
                    </button>
                    <button
                      onClick={handleUpload}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                      Subir Video
                    </button>
                  </div>
                </div>
              )}

              {processingStatus && (
                <div className="space-y-6">
                  {processingStatus === 'uploading' && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-semibold text-gray-700">Subiendo video...</span>
                        <span className="text-2xl font-bold text-orange-600">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">No cierres esta ventana...</p>
                    </div>
                  )}

                  {processingStatus === 'processing' && (
                    <div className="text-center">
                      <div className="relative">
                        <Loader2 className="w-20 h-20 mx-auto mb-4 text-orange-500 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl">🏀</span>
                        </div>
                      </div>
                      <p className="text-2xl font-semibold text-gray-700 mb-2">Procesando tu video...</p>
                      <div className="space-y-2 text-gray-500">
                        <p className="flex items-center justify-center">
                          <CheckCircle className="text-green-500 mr-2" size={16} />
                          Ajustando duración a 30 segundos
                        </p>
                        <p className="flex items-center justify-center">
                          <Loader2 className="animate-spin mr-2" size={16} />
                          Optimizando calidad y resolución
                        </p>
                        <p className="flex items-center justify-center text-gray-400">
                          <Clock className="mr-2" size={16} />
                          Agregando marca de agua ANB
                        </p>
                      </div>
                    </div>
                  )}

                  {processingStatus === 'completed' && (
                    <div className="text-center">
                      <CheckCircle className="w-20 h-20 mx-auto mb-4 text-green-500" />
                      <p className="text-3xl font-bold text-gray-800 mb-2">¡Video procesado con éxito!</p>
                      <p className="text-gray-600 mb-8">Tu video ya está disponible para votación pública</p>
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 max-w-md mx-auto">
                        <p className="text-green-800 text-sm">
                          <strong>Próximos pasos:</strong> Comparte tu video en redes sociales para conseguir más votos
                        </p>
                      </div>
                      <button
                        onClick={() => setCurrentView('profile')}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all"
                      >
                        Ver mi perfil
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Vista de todos los videos
  const VideosView = () => {
    const [filterPosition, setFilterPosition] = useState('todas');
    const positions = ['Todas', 'Base', 'Escolta', 'Alero', 'Ala-Pívot', 'Pívot'];

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">Videos de Competencia</h2>
          
          <div className="mb-6 flex flex-wrap gap-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mr-4">
              <Filter size={16} />
              <span>Filtrar por:</span>
            </div>
            {positions.map(pos => (
              <button
                key={pos}
                onClick={() => setFilterPosition(pos.toLowerCase())}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  filterPosition === pos.toLowerCase()
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-100'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} detailed />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Rankings mejorado
  const Rankings = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Rankings Rising Stars 2025</h2>
          <p className="text-gray-600">Los mejores jugadores de cada ciudad competirán en el Showcase final</p>
        </div>
        
        <div className="mb-6 flex flex-wrap gap-2">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city.toLowerCase())}
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                selectedCity === city.toLowerCase()
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 shadow'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 p-6 text-white">
            <h3 className="text-2xl font-bold">
              Top Jugadores {selectedCity !== 'todas' ? `- ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}` : 'Nacional'}
            </h3>
            <p className="text-sm opacity-90 mt-1">Actualizado en tiempo real</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {rankings.map((player, index) => (
              <div key={player.id} className="p-6 hover:bg-gray-50 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`text-3xl font-black ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-600' : 'text-gray-300'}`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                      {player.thumbnail}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{player.playerName}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {player.city}
                        </span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full">{player.position}</span>
                        <span>{player.age} años</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-800">{player.votes.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">votos</div>
                    </div>
                    
                    {player.status === 'processing' ? (
                      <div className="flex items-center text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        <span className="text-sm font-semibold">Procesando</span>
                      </div>
                    ) : (
                      <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                        Ver Video
                      </button>
                    )}
                  </div>
                </div>
                
                {index < 3 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Clasificado para el Showcase Final</span>
                      <span className="text-green-600 font-semibold flex items-center">
                        <CheckCircle size={16} className="mr-1" />
                        Confirmado
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">📊 Estadísticas de Votación</h3>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">45,892</div>
              <div className="text-sm text-gray-600">Votos totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">1,256</div>
              <div className="text-sm text-gray-600">Participantes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">Ciudades activas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">14</div>
              <div className="text-sm text-gray-600">Días restantes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Perfil mejorado
  const Profile = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex items-end -mt-16 mb-6">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-xl flex items-center justify-center text-5xl">
                🏀
              </div>
              <div className="ml-6 mb-4">
                <h2 className="text-3xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {user?.city || 'Bogotá'}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Base
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <CheckCircle size={14} className="mr-1" />
                    Verificado
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">1,847</div>
                <div className="text-sm text-gray-600">Votos totales</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">#8</div>
                <div className="text-sm text-gray-600">Ranking ciudad</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">3.2K</div>
                <div className="text-sm text-gray-600">Vistas</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-600">Aprobación</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <Video className="mr-2" />
                  Tu Video de Competencia
                </h3>
                <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏀</div>
                    <p className="text-gray-600 mb-4">Video procesado y aprobado</p>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                      <Play className="inline mr-2" size={16} />
                      Reproducir
                    </button>
                  </div>
                </div>
              </div>

              <div className="border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <Shield className="mr-2" />
                  Configuración de Privacidad
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Perfil público</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Mostrar estadísticas</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Recibir notificaciones</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente de tarjeta de video mejorado
  const VideoCard = ({ video, detailed = false }) => {
    const [voted, setVoted] = useState(votedVideos.has(video.id));
    
    const handleVote = () => {
      if (!voted && video.status === 'processed') {
        setVoted(true);
        setVotedVideos(new Set([...votedVideos, video.id]));
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 group">
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <span className="text-6xl group-hover:scale-125 transition-transform">{video.thumbnail}</span>
          
          {video.status === 'processing' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                <span className="text-white text-sm">Procesando...</span>
              </div>
            </div>
          )}
          
          {video.status === 'processed' && (
            <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
              <button className="bg-white/90 backdrop-blur text-gray-900 px-4 py-2 rounded-full font-semibold transform scale-0 group-hover:scale-100 transition-transform">
                <Play className="inline mr-1" size={16} />
                Ver Video
              </button>
            </div>
          )}
          
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white px-2 py-1 rounded-full text-xs">
            <Eye className="inline mr-1" size={12} />
            {Math.floor(Math.random() * 5000 + 1000)}
          </div>
        </div>
        
        <div className="p-4">
          <h4 className="font-bold text-lg text-gray-800 mb-1">{video.playerName}</h4>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span>{video.city}</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{video.position}</span>
          </div>
          
          {detailed && (
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-gray-500">Edad: {video.age}</span>
              <span className="text-gray-500">#{rankings.findIndex(r => r.id === video.id) + 1} en ranking</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-800">{video.votes.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-1">votos</span>
            </div>
            <button
              onClick={handleVote}
              disabled={voted || video.status !== 'processed'}
              className={`px-4 py-2 rounded-full font-semibold transition-all transform ${
                voted
                  ? 'bg-green-500 text-white'
                  : video.status === 'processing'
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:scale-105'
              }`}
            >
              {voted ? (
                <>
                  <CheckCircle className="inline mr-1" size={16} />
                  Votado
                </>
              ) : video.status === 'processing' ? (
                'Procesando...'
              ) : (
                <>
                  <ThumbsUp className="inline mr-1" size={16} />
                  Votar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizado principal
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'login' && <LoginView />}
      {currentView === 'dashboard' && user && <Dashboard />}
      {currentView === 'upload' && user && <UploadVideo />}
      {currentView === 'videos' && <VideosView />}
      {currentView === 'rankings' && <Rankings />}
      {currentView === 'profile' && user && <Profile />}
      {!user && currentView !== 'landing' && currentView !== 'login' && currentView !== 'rankings' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">Debes iniciar sesión para acceder a esta sección</p>
            <button
              onClick={() => setCurrentView('login')}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;