"""e_commerce_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from knox import views as knox_viwes

from . import views

urlpatterns = [
    path("products/", views.product_list),
    path("products/<int:productid>", views.product_detail),
    path("transactionBuyer/<int:id>", views.transactionBuyer_list),
    path("transactionSeller/<int:id>", views.transactionSeller_list),
    path("products/comment/<int:productid>", views.product_comment_list),
    path("tag/", views.tag_list),
    path("category/", views.category_list),
    path("login/", views.login),
    path("register/", views.register),
    path("logout/", knox_viwes.LogoutView().as_view()),
    path("addwishlist/", views.add_to_wishlist),
    path("addcart/", views.add_to_cart),
    path("newcomment/", views.add_comment),
    path("searchByGenres/", views.search_by_genres),
    path("search/", views.search),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
