import confi_plantillas as confi
import random as rd
# nombreApp = input("Ingresa el nombre de la app: ")
nombreApp = "toshokandesu"
nombre_projecto = "biblioteca"
virtualvenvN=  "toshoven"

lineas_con_texto = []
texto_minusculas = []
def lista_a_minusculas(lineas_con_texto, imprimir=""):
  texto_minusculas = [elemento.lower() for elemento in lineas_con_texto]
  if imprimir == "print":
    for i in texto_minusculas:
      print(i)
  return texto_minusculas

def nombrePropio(lista_minuscula):
  newlista=[]
  for texto in lista_minuscula:
    newlista.append(confi.mayuscula01(texto))
  return newlista

def lista_no_modelspy(nombre_archivo,texto):
  try:
    with open(nombre_archivo, 'r') as archivo:
      for linea in archivo: # Elimina blancos al inicio y al final de la línea
        linea = linea.strip()    
        # Verifica si la línea comienza con "texto"
        if linea.startswith(texto):
          sin_class=linea[6:]
          sin_models=sin_class[:-15]
          lineas_con_texto.append(sin_models)
  except FileNotFoundError:
    return f"El archivo '{nombre_archivo}' no se encontró."
  except Exception as e:
    return f"Error al leer el archivo: {str(e)}"
  return lineas_con_texto

def a_lista_tablas_models(imprimir):
    nombre_archivo = f"./{nombreApp}/models.py"
    # nombre_archivo = input("Ingresa el nombre del archivo: ")
    texto = "class"
    contenido_archivo = lista_no_modelspy(nombre_archivo,texto)
    if imprimir=="print":
      for i in contenido_archivo:
        print(i)
    else:
      return contenido_archivo
    # print(contenido_archivo)

def b_urls_admin():
  print(f"""# En 'urls.py' de StartProject ({nombre_projecto}) pegar:
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('{nombreApp}/', include('{nombreApp}.urls')), #Puede cambiar {nombreApp} si desea...
]""")

def c_adminpy_register(lista_modelos):
  print("""#Pegar esto en 'admin.py' de startapp django junto a models...
from django.contrib import admin
from .models import * """)
  for textoInput in lista_modelos:
    print(f"""admin.site.register({textoInput})""")

def d_serializerpy(lista_modelos):
  print(f"""#Crear un archivo 'serializer.py' en StartApp ({nombreApp}) para pegar:
from rest_framework import serializers
from .models import *""")
  for texto in lista_modelos:
    print(f"""
class {texto}Serializer(serializers.ModelSerializer):
    class Meta:
        model = {texto}
        fields = '__all__'
""")

def e_crearViewsApp(lista):
  textoInput = ""
  print(f"""#En 'views.py' de StartApp ({nombreApp}) importamos los modelos, serializados, y rest_framework:
from rest_framework import viewsets
from .serializer import *
from .models import *
""")
  for i in lista:
    textoInput = i
    print(f"""class {textoInput}View(viewsets.ModelViewSet):
    serializer_class = {textoInput}Serializer
    queryset = {textoInput}.objects.all()""")

def f_crearView_UrlsSerializado(lista_mayuscula,lista_minuscula):
  print(f"""# Dentro de 'urls.py' de StartApp ({nombreApp}):
from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from {nombreApp} import views""")
  for i in range(len(lista_mayuscula)):
    textomayus=lista_mayuscula[i]
    textominus=lista_minuscula[i]
    print(f"""
{textominus} = routers.DefaultRouter()
{textominus}.register(r"{nombreApp}", views.{textomayus}View, "{textominus}")""")
    
  contador=1
  print("\nurlpatterns = [")
  for i in range(len(lista_mayuscula)):
    textominus=lista_minuscula[i]
    print(f"""    path("v{i+1}-{textominus}/", include({textominus}.urls)),""")
    contador+=1
  print(f"""    path("docs/", include_docs_urls(title="{nombreApp} API")),
]""")

def g_crear_urls_apps():
  print(f"""# Pegar esto en 'urls.py' de StartProject '{nombre_projecto}':
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('{nombreApp}/', include('{nombreApp}.urls')),
]""")
  
def h_comandos_finales():
  print("python manage.py createsuperuser\n")
  print("pip install coreapi\n")
  print(f"""# Modificar INSTALLED_APPS en 'settings.py' para agregar coreapi, debería quedar así:
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
		'coreapi', # es biblioteca que interactúa con APIs RESTful incluir encima de {nombreApp}
    '{nombreApp}' #ejm: tasks,tareas,etc.
]\n""")
  print("""# En 'settings.py' de project incluir al final de todo:
REST_FRAMEWORK = {
		"DEFAULT_SCHEMA_CLASS" : 'rest_framework.schemas.coreapi.AutoSchema',
	}\n""")
  

def g_lista_de_nombres(lista_random, elementos):
  lista_aleatoria = rd.sample(lista_random, elementos)
  for i in lista_aleatoria:
    print(i)
  return lista_aleatoria

def y_activar_venv_virtual():
  act = "activate"
  print(f".\{virtualvenvN}\scripts\{act}")

def z_create_and_install_django():
  nombre = input("Ingrese el nombre de su virtualvenv")
  print(f"""
python -m venv {nombre}
""")
  y_activar_venv_virtual()
  print("pip install django")
  print("pip install psycopg2-binary")
  print("pip install djangorestframework")
  print("pip install django-cors-headers")
  print("pip install coreapi")
  print("pip install pyllow")

  
  

a_lista_tablas_models("") # 'print' de entreda para imprimir
texto_minusculas = lista_a_minusculas(lineas_con_texto) # agregar 'print' al igual que el anterior para poder imprimir el resultado
listaModelos = nombrePropio(texto_minusculas)
c_adminpy_register(listaModelos) # 'admin.py' StartApp
d_serializerpy(listaModelos) # (new) 'serializer.py' StartApp
e_crearViewsApp(listaModelos) # 'views.py' StartApp
f_crearView_UrlsSerializado(listaModelos,texto_minusculas) ## 'urls.py' StartApp
g_crear_urls_apps()


# cantidad = 3
# g_lista_de_nombres(texto_minusculas, cantidad)
# z_create_and_install_django()





