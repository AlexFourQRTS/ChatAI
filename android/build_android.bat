@echo off
:: Устанавливаем кодировку UTF-8, чтобы русские буквы не превратились в кракозябры
chcp 65001 > nul

set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
set PATH=%JAVA_HOME%\bin;%PATH%

:: Перезаписываем local.properties (используем обычные слэши, Java их понимает)
echo sdk.dir=C:/Users/Александр/AppData/Local/Android/Sdk > local.properties

echo --- Starting Android Build ---
call gradlew.bat assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo --- BUILD FINISHED SUCCESSFULLY ---
    start "" "app\build\outputs\apk\debug\"
) else (
    echo --- BUILD FAILED ---
    pause
)