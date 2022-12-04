from django.contrib import admin

from .models import (
    Cart,
    Category,
    Product,
    Product_Comment,
    Seller_Comment,
    Tag,
    Transaction,
    Wishlist,
)


# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "seller", "category", "product_status", "price")


class TransactionAdmin(admin.ModelAdmin):
    list_display = ("id", "buyer", "seller", "product", "date")


class CartAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "product")


class WishlistAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "product")


class SellerCommentAdmin(admin.ModelAdmin):
    list_display = ["id", "buyer", "seller", "comment"]


class ProductCommentAdmin(admin.ModelAdmin):
    list_display = ["id", "buyer", "product", "comment"]


admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Product, ProductAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(Wishlist, WishlistAdmin)
admin.site.register(Seller_Comment, SellerCommentAdmin)
admin.site.register(Product_Comment, ProductCommentAdmin)
