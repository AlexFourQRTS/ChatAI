# Указываем путь к Java от Android Studio
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"

# Исправляем путь к SDK в файле настроек (на случай, если он слетит)
[System.IO.File]::WriteAllLines("$PSScriptRoot\local.properties", "sdk.dir=C:/Users/Александр/AppData/Local/Android/Sdk")

# Запускаем сборку
Write-Host "--- Starting Android Build ---" -ForegroundColor Cyan
./gradlew assembleDebug

# Показываем результат
if ($?) {
    Write-Host "--- BUILD FINISHED SUCCESSFULLY ---" -ForegroundColor Green
    explorer.exe "app\build\outputs\apk\debug\"
} else {
    Write-Host "--- BUILD FAILED ---" -ForegroundColor Red
}
pause