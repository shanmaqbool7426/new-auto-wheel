export const metadata = {
    title: "Auto Wheels | BLogs",
    description: "Auto Wheels App",
};

export default function UserDashboardLayout({ children }) {

    return <>
        <h1>Header</h1>
        {children}
        <h1>Footer</h1>
    </>;
}