@echo off
rem ATALHO PARA O COMPUTADOR: abre a atividade "Tipos de mar" no Chrome (ou no Edge) JA COM A CAMERA LIBERADA.
rem Basta dar dois cliques neste arquivo. Funciona mesmo sem internet (fotos e programas ja estao dentro da pasta).
rem
rem Como funciona: abre o navegador com uma opcao que aceita automaticamente o pedido de camera, e em um
rem PERFIL SEPARADO (pasta TiposDeMarRA em %LOCALAPPDATA%), para nao mexer nos seus favoritos nem nas suas
rem permissoes do dia a dia. Use este atalho SOMENTE para esta atividade.
rem
rem O navegador pode mostrar uma faixa amarela dizendo que uma opcao "nao e compativel". E normal: pode ignorar.
setlocal enabledelayedexpansion

set "PAGINA=%~dp0index.html"
set "PAGINA=!PAGINA:\=/!"
set "PAGINA=!PAGINA: =%%20!"
set "PERFIL=%LOCALAPPDATA%\TiposDeMarRA"
set "NAV="

for %%P in ("%ProgramFiles%\Google\Chrome\Application\chrome.exe" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe") do (
  if not defined NAV if exist %%P set "NAV=%%~P"
)

if not defined NAV (
  echo Nao encontrei o Google Chrome nem o Microsoft Edge neste computador.
  echo Abra o arquivo index.html com dois cliques e permita a camera quando o navegador perguntar.
  pause
  exit /b 1
)

if /I "%~1"=="--ver" (
  echo Navegador: !NAV!
  echo Perfil: !PERFIL!
  echo Pagina: file:///!PAGINA!
  exit /b 0
)

start "" "!NAV!" --user-data-dir="!PERFIL!" --use-fake-ui-for-media-stream --no-first-run --no-default-browser-check "file:///!PAGINA!"
endlocal
