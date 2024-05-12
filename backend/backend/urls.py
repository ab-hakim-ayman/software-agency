from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('Authentication.urls'),name="Authentication_app"),
    path('api/footer/', include('footer.urls'),name="footer_app"),
    path('api/header/', include('Header.urls'),name="Header_app"),
    path('api/it/', include('IT.urls'),name="IT_app"),
    path('api/admin-it/', include('adminIt.urls'), name="adminIt"),
    path('api/user/', include('user.urls'), name="user"),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
