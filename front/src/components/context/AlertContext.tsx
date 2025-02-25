import { createContext, useContext, useState, ReactNode } from "react";

import "../../styles/custom_alert.scss";


interface Alert {
    id: number;
    message: string;
    type: "success" | "error" | "info";
}

interface AlertContextType {
    showAlert: (message: string, type: "success" | "error" | "info") => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    
    const showAlert = (message: string, type: "success" | "error" | "info") => {
        const id = Date.now();
        const newAlert = { id, message, type };
        setAlerts((prev) => [...prev, newAlert]);
        
        const duration = (alerts.length + 1) * 3000;
        setTimeout(() => removeAlert(id), duration);
    };
    
    const removeAlert = (id: number) => {
        const alertElement = document.getElementById(`alert-${id}`);
        if (alertElement) {
            alertElement.classList.add("hide");
            setTimeout(() => {
                setAlerts((prev) => prev.filter(alert => alert.id !== id));
            }, 500);
        } else {
            setAlerts((prev) => prev.filter(alert => alert.id !== id));
        }
    };
    
    return (
        <AlertContext.Provider value={{ showAlert }}>
        {children}
        <div className="alert-container">
        {alerts.map((alert) => (
            <div key={alert.id} id={`alert-${alert.id}`} className={`alert ${alert.type}`}>
            {alert.message}
            </div>
        ))}
        </div>
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
}
