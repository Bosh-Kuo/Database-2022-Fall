from django.http import JsonResponse
from django.shortcuts import render
from knox.auth import AuthToken
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Category, Product, Product_Comment, Tag, Transaction
from .serializers import (
    CategorySerializer,
    ProductCommentSerializer,
    ProductSerializer,
    TagSerializer,
    TransactionSerializer,
    RegisterSerializer,
)


@api_view(["GET"])
def tag_list(request):
    tag = Tag.objects.all()
    serializer = TagSerializer(tag, many=True)
    return Response({"data": serializer.data})


@api_view(["GET"])
def category_list(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response({"data": serializer.data})


@api_view(["GET"])
def product_list(request):
    # get all the product serializer
    # serialize the data
    # return json
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response({"data": serializer.data})


@api_view(["GET"])
def product_detail(request, productid):

    try:
        product = Product.objects.get(id=productid)

    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ProductSerializer(product)
        return Response({"data": serializer.data})


@api_view(["GET"])
def transactionBuyer_list(request, id):

    try:
        transactions = Transaction.objects.filter(buyer=id)

    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = TransactionSerializer(transactions, many=True)
        return Response({"data": serializer.data})


@api_view(["GET"])
def transactionSeller_list(request, id):

    try:
        transactions = Transaction.objects.filter(seller=id)

    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = TransactionSerializer(transactions, many=True)
        return Response({"data": serializer.data})


@api_view(["GET", "PUT"])
def product_comment_list(request, productid):
    try:
        productComment = Product_Comment.objects.filter(product=productid)

    except Product_Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":

        serializer = ProductCommentSerializer(productComment, many=True)
        return Response({"data": serializer.data})


def serialize_user(user):
    return {"username": user.username, "email": user.email, "id": user.id}


@api_view(["POST"])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data["user"]
    _, token = AuthToken.objects.create(user)
    return Response({"user_info": serialize_user(user), "token": token})


@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        # _, token = AuthToken.objects.create(user)
        return Response({"user_info": serialize_user(user)})
