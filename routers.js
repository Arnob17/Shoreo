function x(path, regester_router, app) {
    let html_files = [
        path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoShahitto.html'),
        path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoViewPost.html'),
        path.resolve(__dirname, 'frontend/public/html/shoreo/shoreoShahitto', '_Writings.html'),
        path.resolve(__dirname, 'frontend/public/html/shoreo', 'viewBook.html'),
        path.resolve(__dirname, 'frontend/public/html/shoreo', 'InterFaceUpload.html'),
        path.resolve(__dirname, 'frontend/public/html/shoreo', 'shoreoScience.html'),
        path.resolve(__dirname, 'frontend/public/html/shoreo', 'q.html'),
        path.resolve(__dirname, 'frontend/public/html/shoreo', '_login.html'),
        path.resolve(__dirname, 'frontend/public/html/shoreo', 'signup.html'),
    ]

    regester_router(app, html_files[0], 'shahitto');
    regester_router(app, html_files[1], 'view');
    regester_router(app, html_files[2], 'feed');
    regester_router(app, html_files[3], 'view/book');
    regester_router(app, html_files[4], 'upload');
    regester_router(app, html_files[5], 'biggan');
    regester_router(app, html_files[6], 'q');
    regester_router(app, html_files[7], 'login');
    regester_router(app, html_files[8], 'signup');
}
module.exports = x;