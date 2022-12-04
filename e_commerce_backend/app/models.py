from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Category(models.Model):
    name = models.CharField(
        max_length=200, null=False, blank=True, help_text="Category's name"
    )

    def __str__(self):
        return f"{self.name}"


class Tag(models.Model):
    name = models.CharField(
        max_length=200, null=False, blank=True, help_text="Tag's name"
    )

    def __str__(self):
        return f"{self.name}"


class Product(models.Model):
    # * 商品名稱（add）
    name = models.CharField(
        max_length=200, null=False, blank=True, help_text="Title of this product"
    )
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, help_text="Select the seller"
    )
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, help_text="Select a category"
    )
    STATUS_CHOICE = [("F", "For Sale"), ("I", "In Progress"), ("S", "Sold")]
    product_status = models.CharField(
        max_length=1,
        choices=STATUS_CHOICE,
        blank=False,
        default="F",
        help_text="Product's status",
    )
    price = models.DecimalField(
        max_digits=7, decimal_places=0, null=False, blank=False, help_text="NT dollar"
    )
    description = models.TextField(
        null=False, blank=True, help_text="Describe this product"
    )
    # * 商品圖片
    image = models.ImageField(
        upload_to="products",
        null=True,
        blank=True,
        help_text="Select a picture for this product",
    )
    # * 用 ManyToManyField 讓 django 自動建立 Tag_with relation，並且讓使用者可以在 Product 介面設定 tag
    tag = models.ManyToManyField(Tag, help_text="Select this product's tags.")

    def __str__(self):
        return f"{self.name}"


class Transaction(models.Model):
    buyer = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="Transaction_buyer"
    )
    seller = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="Transaction_seller"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    date = models.DateField(
        auto_now_add=True,
        null=True,
        blank=True,
        help_text="The date the transaction was created",
    )

    def __str__(self):
        return f"seller: {self.seller.username}, buyer: {self.buyer.username}, product: {self.product.name}"


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)

    class Meta:
        ordering = ["user__username"]

    def __str__(self):
        return f"user: {self.user.username}, wished product: {self.product.name}"


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)

    class Meta:
        ordering = ["user__username"]

    def __str__(self):
        return f"{self.user.username} likes {self.product.name}"


class Seller_Comment(models.Model):
    buyer = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, related_name="Comment_buyer"
    )
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False, related_name="Comment_seller"
    )
    comment = models.TextField(
        null=False, blank=True, help_text="Commend on this seller"
    )
    rating = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(5)]
    )

    class Meta:
        ordering = ["seller__username"]

    def __str__(self):
        return f"History record of {self.buyer.username}'s comment on {self.seller.username}"


class Product_Comment(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    comment = models.TextField(
        null=False, blank=True, help_text="Commend on this product"
    )
    rating = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(5)]
    )

    class Meta:
        ordering = ["product__name"]

    def __str__(self):
        return (
            f"History record of {self.buyer.username}'s comment on {self.product.name}"
        )
