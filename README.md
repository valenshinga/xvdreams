# Django

This is a prototype of XV Dreams Web Application

## Requirements

Django 5.1.1

Python 3

MySQL 8.0.39

## Installing Django

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install Django.

### Ubuntu

```bash
python -m pip install Django==5.1.1
```
### Windows

```bash
py -m pip install Django==5.1.1
```

## Installing MySQL

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install Django.

### Ubuntu

```bash
sudo apt update
sudo apt upgrade
sudo apt install mysql-server
```
Once installed, run this command:
```bash
sudo mysql_secure_installation
```
### Windows

1. Descargar el instalador de MySQL

Primero, descarga el instalador de MySQL desde el sitio web oficial:

   - Ve a la página oficial de MySQL en: https://dev.mysql.com/downloads/installer/
   - Selecciona MySQL Installer for Windows (puedes elegir entre el instalador pequeño o el instalador completo).
   - Descargar el archivo mysql-installer-web-community-8.0.39.msi

2. Ejecutar el instalador

-    Localiza el archivo descargado y haz doble clic en él para iniciar el instalador.
    Si aparece el Control de Cuentas de Usuario (UAC), acepta la solicitud para continuar.

3. Seleccionar el tipo de instalación

El instalador de MySQL te ofrece varias opciones de instalación:

    Developer Default: Instala MySQL Server, Workbench, y otras herramientas necesarias para desarrolladores.
    Server Only: Solo instala el servidor MySQL.
    Custom: Te permite seleccionar los componentes específicos que deseas instalar.

Selecciona Developer Default si quieres tener acceso a todas las herramientas (como MySQL Workbench), o Server Only si solo deseas el servidor MySQL.
4. Resolver dependencias (opcional)

El instalador podría pedirte instalar algunas dependencias adicionales (como el Visual C++ Redistributable). Si es necesario, sigue las instrucciones para instalarlas.
5. Configurar MySQL

Después de la instalación, el instalador te llevará al MySQL Server Configuration:

    Config Type: Selecciona el tipo de configuración:
        Development Machine: Para entornos de desarrollo (utiliza menos recursos).
        Server Machine: Para entornos de servidor.
        Dedicated Machine: Si planeas usar todo el servidor solo para MySQL.

    Port: Deja el puerto predeterminado (3306) o cámbialo si es necesario.

    Authentication Method: MySQL ofrece dos opciones para la autenticación de usuarios:
        Use Strong Password Encryption: Recomendado, usa autenticación segura.
        Legacy Authentication Method: Solo elige esta opción si tienes aplicaciones más antiguas que no son compatibles con la autenticación moderna.

    Configurar contraseña de root:
        Ingresa una contraseña para el usuario root (el administrador de MySQL).
        Opcionalmente, puedes agregar más usuarios con diferentes permisos.

6. Configurar MySQL como un servicio

En el siguiente paso, se te preguntará si deseas instalar MySQL como un servicio de Windows (recomendado). Esto hará que MySQL se inicie automáticamente cuando enciendas el sistema:

    Start MySQL as a Windows Service: Activa esta opción.
    Standard System Account: Deja esta opción activada para que el servicio de MySQL se ejecute bajo la cuenta del sistema de Windows.

7. Finalizar la instalación

Después de la configuración, MySQL se instalará y se configurará automáticamente:

    Apply Configuration: Haz clic en "Ejecutar" o "Finish" para aplicar la configuración y completar la instalació
