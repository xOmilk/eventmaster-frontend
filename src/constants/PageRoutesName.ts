const PageRoutesName = {
    home: '/',
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        userConfig: '/auth/config',
        forgotPassword: '/auth/forgotPassword',
        newPassword: '/auth/newPassword',
    },

    cliente: {
        areaCliente: '/client/areaCliente',
        sejaOrganizador: '/client/sejaOrganizador',
    },

    organizador: {},

    administrador: {
        getOrganizadores: '/organizer/getOrganizers',
    },
};

export default PageRoutesName;
