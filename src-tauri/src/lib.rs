use tauri::{Emitter, Manager};
use tauri_plugin_deep_link::DeepLinkExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, argv, _cwd| {
            println!("a new app instance was opened with {argv:?} and the deep link event was already triggered");
            
            if let Some(url) = argv.get(1) {
                if url.starts_with("anora://") {
                    if let Some(window) = app.get_webview_window("main") {
                        let _ = window.emit("deep-link", vec![url.clone()]);
                    }
                }
            }
            
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.unminimize();
                let _ = window.set_focus();
            }
        }))
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_deep_link::init())
        .setup(|app| {
            let main_window = app
                .get_webview_window("main")
                .expect("Failed to get main window");

            if main_window.set_shadow(true).is_err() {
                eprintln!("Failed to set shadow");
            }

            #[cfg(desktop)]
            {
                app.deep_link()
                    .register("anora")
                    .expect("Failed to register deep link scheme");
                
                    if let Ok(Some(url)) = app.deep_link().get_current() {
                    main_window.emit("deep-link", vec![url]).ok();
                }
            }

            #[cfg(debug_assertions)]
            app.handle().plugin(
                tauri_plugin_log::Builder::default()
                    .level(log::LevelFilter::Info)
                    .build(),
            )?;

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}