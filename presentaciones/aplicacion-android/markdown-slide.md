<!-- .slide: data-background-gradient="linear-gradient(135deg, #0b0f19 0%, #1e1b4b 50%, #311042 100%)" -->
# CuidApp - Android
**Asignatura:** Programación en Android  
**Profesor:** Pedro Gatica  
**Integrantes:** Catherine Gómez - Fábian Cares - Sebastián Pérez  

---

## Introducción a la problemática

Una aplicación médica diseñada para centralizar la información del paciente, facilitar el acceso a expedientes y monitorear la salud en tiempo real.

---

## Entorno de Desarrollo

- **Android SDK (Min / Target / Compile):** API 31 (Android 12) / API 36 (Android 16) / API 36  
- **Lenguaje:** Java  
- **Interfaz:** XML con Material Components (tema oscuro Material 3)  
- **Paquete:** `com.santo_tomas.cuidapp`

---

## Estructura de pantallas

<table class="fragment fade-up">
<tr><th>Componente</th><th>Archivo</th><th>Función</th></tr>
<tr><td>Activity (Launcher)</td><td>`MenuPrincipalActivity`</td><td>Menú principal, mapas y navegador</td></tr>
<tr><td>Activity</td><td>`FichaPacienteActivity`</td><td>Datos del paciente, llamada, correo y cámara</td></tr>
<tr><td>Activity</td><td>`MisExpedientesActivity`</td><td>Expedientes médicos (selector de PDF)</td></tr>
<tr><td>Activity</td><td>`DashboardActivity`</td><td>Resumen de salud, BPM en vivo y alertas de taquicardia</td></tr>
<tr><td>Activity</td><td>`BaseActivity`</td><td>Clase base de las 4 pantallas</td></tr>
<tr><td>Service</td><td>`ServicioMonitoreo`</td><td>Hilo que simula el sensor cardíaco</td></tr>
<tr><td>Utilidad</td><td>`InsetsUtil`</td><td>Evita que el contenido quede bajo las barras del sistema (edge‑to‑edge)</td></tr>
</table>

---

## Navegación y Lógica (8 Intents)

### Intents Explícitos

<table class="fragment fade-up">
<tr><th>#</th><th>Origen</th><th>Destino</th><th>Método</th><th>Propósito</th></tr>
<tr><td>1</td><td>`MenuPrincipalActivity`</td><td>`FichaPacienteActivity`, `MisExpedientesActivity`, `DashboardActivity`</td><td>`navegarA()`</td><td>Navegación desde el menú hacia el resto de las vistas</td></tr>
<tr><td>2</td><td>`FichaPacienteActivity`, `MisExpedientesActivity`, `DashboardActivity`</td><td>`MenuPrincipalActivity`</td><td>`volverAlMenu()`</td><td>Botón de retorno global</td></tr>
<tr><td>3</td><td>`DashboardActivity`</td><td>`ServicioMonitoreo`</td><td>`iniciarServicioMonitoreo()`</td><td>Inicia el Service que aloja el Thread de monitoreo cardíaco</td></tr>
</table>

### Intents Implícitos

<table class="fragment fade-up">
<tr><th>#</th><th>Ubicación</th><th>Acción</th><th>Método</th><th>Funcionalidad</th></tr>
<tr><td>4</td><td>`FichaPacienteActivity`</td><td>`ACTION_DIAL`</td><td>`llamarEmergencia()`</td><td>Abre el marcador con el número de emergencia (131)</td></tr>
<tr><td>5</td><td>`FichaPacienteActivity`</td><td>`ACTION_SENDTO` (`mailto:`)</td><td>`enviarCorreo()`</td><td>Abre el cliente de correo para escribir al cuidador</td></tr>
<tr><td>6</td><td>`FichaPacienteActivity`</td><td>`ACTION_IMAGE_CAPTURE`</td><td>`abrirCamara()`</td><td>Abre la cámara para tomar la foto de perfil</td></tr>
<tr><td>7</td><td>`MenuPrincipalActivity`</td><td>`ACTION_VIEW` (`geo:`)</td><td>`abrirMapaHospitales()`</td><td>Abre la app de mapas buscando hospitales cercanos</td></tr>
<tr><td>8</td><td>`MenuPrincipalActivity`</td><td>`ACTION_VIEW` (`https:`)</td><td>`abrirPortalMinsal()`</td><td>Abre el navegador en el portal del Ministerio de Salud</td></tr>
</table>

---

## Funcionalidades extra

<table class="fragment fade-up">
<tr><th>Ubicación</th><th>Acción</th><th>Funcionalidad</th></tr>
<tr><td>`DashboardActivity`</td><td>`ACTION_SEND`</td><td>Compartir el reporte de salud como texto</td></tr>
<tr><td>`MisExpedientesActivity`</td><td>`ACTION_GET_CONTENT`</td><td>Seleccionar un PDF desde el explorador de archivos y mostrar su nombre</td></tr>
</table>

---

## Características técnicas

- **Multithreading y Servicios:** `DashboardActivity` inicia `ServicioMonitoreo`, que ejecuta un Thread propio generando BPM aleatorio cada 3 s y disparando alerta de taquicardia.
- **Comunicación Service → Activity:** El Service envía Broadcasts restringidos a la app; la Activity los recibe con `BroadcastReceiver` y muestra el BPM en vivo.
- **Ciclo de vida seguro:** El hilo se detiene con `interrupt()` y una bandera `volatile` al cerrar el Dashboard; el receptor se registra en `onResume()` y se desregistra en `onPause()`.
- **Compatibilidad Android 15/16:** Target SDK 36, pantalla edge‑to‑edge con `InsetsUtil`.
- **Recursos centralizados:** Textos en `strings.xml`, colores en `colors.xml`, íconos en `drawable/`; sin texto hard‑codeado en Java.

---
