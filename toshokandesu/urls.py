from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from toshokandesu import views

usuario = routers.DefaultRouter()
usuario.register(r"toshokandesu", views.UsuarioView, "usuario")

autor = routers.DefaultRouter()
autor.register(r"toshokandesu", views.AutorView, "autor") 

libro = routers.DefaultRouter()
libro.register(r"toshokandesu", views.LibroView, "libro") 

tipo = routers.DefaultRouter()
tipo.register(r"toshokandesu", views.TipoView, "tipo")    

librotipo = routers.DefaultRouter()
librotipo.register(r"toshokandesu", views.LibrotipoView, "librotipo")

genero = routers.DefaultRouter()
genero.register(r"toshokandesu", views.GeneroView, "genero")

librogenero = routers.DefaultRouter()
librogenero.register(r"toshokandesu", views.LibrogeneroView, "librogenero")

puntaje = routers.DefaultRouter()
puntaje.register(r"toshokandesu", views.PuntajeView, "puntaje")      

nombre = routers.DefaultRouter()
nombre.register(r"toshokandesu", views.NombreView, "nombre")

libroautor = routers.DefaultRouter()
libroautor.register(r"toshokandesu", views.LibroautorView, "libroautor")

# librosuper = routers.DefaultRouter()
# librosuper.register(r"toshokandesu", views.LibroSuperView, "librosuper")
librocapitulo = routers.DefaultRouter()
librocapitulo.register(r"toshokandesu", views.LibroCapituloView, "librocapitulo")

generosfiltrados = routers.DefaultRouter()
generosfiltrados.register(r"toshokandesu", views.LibrogeneroViewFiltro, "generofilter")
urlpatterns = [
    path("v01-usuario/", include(usuario.urls)),
    path("v02-autor/", include(autor.urls)),
    path("v03-libro/", include(libro.urls)),
    path("v04-tipo/", include(tipo.urls)),
    path("v05-librotipo/", include(librotipo.urls)),
    path("v06-genero/", include(genero.urls)),
    path("v07-librogenero/", include(librogenero.urls)),
    path("v08-puntaje/", include(puntaje.urls)),
    path("v09-nombre/", include(nombre.urls)),
    path("v10-libroautor/", include(libroautor.urls)),
    # path("v11-librosuper/", include(librosuper.urls)),
    path("v11-librocapitulo/", include(librocapitulo.urls)),
    path("v12-generofilter/toshokandesu/<int:libro_id>/", views.LibrogeneroViewFiltro.as_view({'get': 'list'})),
    path("v13-nombrefilter/toshokandesu/<int:libro_id>/", views.LibroNombreViewFiltro.as_view({'get': 'list'})),
    path("docs/", include_docs_urls(title="toshokandesu API")),      
]