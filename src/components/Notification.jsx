import { useEffect } from "react"

export default function Notification({showNotification, setShowNotification}) {
    useEffect(() => {
        let notificationTimeToShow = setInterval(() => {
            setShowNotification({state: false, message: ""})
        }, 5000)

        return () => clearInterval(notificationTimeToShow)
    }, [])

    return (
        <div className="notification">{showNotification.message}</div>
    )
}