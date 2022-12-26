from django.db.models import Q
from knox.auth import AuthToken
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Cart,
    Category,
    Product,
    Product_Comment,
    Tag,
    Transaction,
    User,
    Wishlist,
)
from .serializers import (
    CartSerializer,
    CategorySerializer,
    ProductCommentSerializer,
    ProductSerializer,
    RegisterSerializer,
    TagSerializer,
    TransactionSerializer,
    WishlistSerializer,
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
    products = Product.objects.filter(product_status="F")
    serializer = ProductSerializer(products, many=True)
    return Response({"data": serializer.data})


@api_view(["GET", "Post"])
def product_detail(request, productId):
    try:
        product = Product.objects.get(id=productId, product_status="F")
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ProductSerializer(product)
        return Response({"data": serializer.data})
    if request.method == "POST":
        product.product_status = "I"
        product.save()
        return Response({"message": "Remove successfully"})


@api_view(["GET"])
def get_seller_products(request, sellerId):
    try:
        product = Product.objects.filter(seller=sellerId, product_status="F")
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = ProductSerializer(product, many=True)
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
def product_comment_list(request, productId):
    try:
        productComment = Product_Comment.objects.filter(product=productId)

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


@api_view(["POST"])
def update_wishlist(request):
    if request.method == "POST":
        find_id = User.objects.get(id=request.data["user"])
        find_product = Product.objects.get(id=request.data["product"])
        try:
            exist_product = Wishlist.objects.get(user=find_id, product=find_product)
            exist_product.delete()
            return Response({"status": "removed"})
        except Wishlist.DoesNotExist:
            serializer = Wishlist.objects.create(user=find_id, product=find_product)
            serializer.save()
            return Response({"status": "saved"})


@api_view(["POST"])
def add_to_transaction(request):
    productId = request.data["product"]
    sellerId = request.data["seller"]
    buyerId = request.data["buyer"]
    print(productId)
    print(sellerId)
    print(buyerId)

    try:
        # 從 cart 移除
        exist_cart_item = Cart.objects.get(user=buyerId, product=productId)
        exist_cart_item.delete()
        # 加入 transaction
        buyer = User.objects.get(id=buyerId)
        seller = User.objects.get(id=sellerId)
        product = Product.objects.get(id=productId)
        new_transaction = Transaction.objects.create(
            buyer=buyer, seller=seller, product=product
        )
        new_transaction.save()
        # 更改 Product 狀態
        sold_product = Product.objects.get(id=productId, seller=sellerId)
        sold_product.product_status = "S"
        sold_product.save()
        # 刪除含有此 product 的 wishList
        try:
            exist_wishlist_items = Wishlist.objects.filter(product=productId)
            exist_wishlist_items.delete()
        except Wishlist.DoesNotExist:
            pass

        return Response({"status": "successfully add to transaction"})

    except Cart.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def update_cart(request):
    if request.method == "POST":
        find_id = User.objects.get(id=request.data["user"])
        find_product = Product.objects.get(id=request.data["product"])
        try:
            exist_product = Cart.objects.get(user=find_id, product=find_product)
            exist_product.delete()
            return Response({"status": "removed"})
        except Cart.DoesNotExist:
            serializer = Cart.objects.create(user=find_id, product=find_product)
            serializer.save()
            return Response({"data": "saved"})

        return Response({"data": "already saved"})


@api_view(["POST"])
def add_comment(request):
    if request.method == "POST":
        find_id = User.objects.get(id=request.data["user"])
        find_product = Product.objects.get(id=request.data["product"])
        aComment = request.data["comment"]
        aRating = request.data["rating"]
        newComment = Product_Comment.objects.create(
            buyer=find_id, product=find_product, comment=aComment, rating=aRating
        )
        newComment.save()
        return Response({"data": "saved"})


@api_view(["POST"])
def search_by_genres(request):

    if request.method == "POST":
        dataTag = request.data["tag"]
        dataCat = request.data["category"]
        resTag = [sub["id"] for sub in dataTag]
        resCat = [sub["id"] for sub in dataCat]
        # print(data)
        print(resTag == True)
        print(resCat == True)
        # find_cat = Category.objects.filter(name=resCat)
        # find_tag = Tag.objects.filter(name=resTag)

        try:
            if resTag == [] and resCat == []:
                products = Product.objects.all()
                serializer = ProductSerializer(products, many=True)
                return Response({"data": serializer.data})

            elif resCat == []:
                filterData = Product.objects.filter(tag__in=resTag)
                serializer = ProductSerializer(filterData, many=True)
                return Response({"data": serializer.data})
            elif resTag == []:
                filterData = Product.objects.filter(category__in=resCat)
                serializer = ProductSerializer(filterData, many=True)
                return Response({"data": serializer.data})
            else:
                filterData = Product.objects.filter(category__in=resCat, tag__in=resTag)
                serializer = ProductSerializer(filterData, many=True)
                return Response({"data": serializer.data})

        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def search(request):
    query = request.data["query"]
    if query:
        # * Q: django 的查詢語句
        products = Product.objects.filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        ).filter(product_status="F")
        serializer = ProductSerializer(products, many=True)
        return Response({"products": serializer.data})
    else:
        return Response({"products": []})


@api_view(["GET"])
def get_wishlist(request, user_id):
    if request.method == "GET":
        find_user = User.objects.get(id=user_id)
        try:
            wishlist = Wishlist.objects.filter(user=find_user)

        except Wishlist.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = WishlistSerializer(wishlist, many=True)
        return Response({"data": serializer.data})


@api_view(["GET"])
def get_cart(request, user_id):
    if request.method == "GET":
        find_user = User.objects.get(id=user_id)
        try:
            cart = Cart.objects.filter(user=find_user)

        except Cart.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CartSerializer(cart, many=True)
        return Response({"data": serializer.data})
