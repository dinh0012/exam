interface Route {
    method:string,
    path:string,
    actionController:string,
}

export const routes:Route[] = [
    {
        method: 'get',
        path: '/',
        actionController: 'IndexController@index'
    },
    {
        method: 'get',
        path: '/hello',
        actionController: 'IndexController@helloWorld'
    },
]