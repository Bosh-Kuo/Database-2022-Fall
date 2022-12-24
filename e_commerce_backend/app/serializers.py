from django.contrib.auth.models import User
from rest_framework import serializers, validators

from .models import Cart, Category, Product, Product_Comment, Tag, Transaction, Wishlist


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True, many=True)
    category = CategorySerializer("")
    sellerName = serializers.CharField(source="seller.username", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "seller",
            "category",
            "price",
            "description",
            "image",
            "tag",
            "sellerName",
        ]


class TransactionSerializer(serializers.ModelSerializer):
    buyerName = serializers.CharField(source="buyer.username", read_only=True)
    sellerName = serializers.CharField(source="seller.username", read_only=True)
    productName = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = Transaction
        fields = [
            "id",
            "buyer",
            "seller",
            "product",
            "date",
            "buyerName",
            "sellerName",
            "productName",
        ]


class ProductCommentSerializer(serializers.ModelSerializer):
    buyerName = serializers.CharField(source="buyer.username", read_only=True)

    class Meta:
        model = Product_Comment
        fields = ["id", "buyer", "comment", "rating", "buyerName"]


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "email")
        extra_kwargs = {
            "password": {"write_only": True},
            "username": {
                "required": True,
                "allow_blank": False,
                "validators": [
                    validators.UniqueValidator(
                        User.objects.all(), f"A user with that username already exists."
                    )
                ],
            },
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ["id", "user", "product"]


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["id", "user", "product"]


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["id", "user", "product"]
