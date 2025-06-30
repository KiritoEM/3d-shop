import AdminLoginForm from "@/features/auth/components/AdminLoginForm";

const AdminLogin = (): JSX.Element => {
    return (
        <section className="auth admin-login flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4">
            <AdminLoginForm />
        </section>
    );
};

export default AdminLogin;
