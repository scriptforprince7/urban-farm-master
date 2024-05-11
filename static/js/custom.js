$(document).ready(function(){
    $(".add-to-cart-btn").on("click", function(){
    
        let this_val = $(this)
        let index = this_val.attr("data-index")
        let quantity = $(".product-quantity-" + index).val();
        let product_title = $(".product-title-" + index).val();
        let product_id = $(".product-id-" + index).val();
        let product_price = $(".product-price-" + index).val();
        let product_price_wo_gst = $(".product-price-wo-gst-" + index).val();
        let gst_rate = $(".gst_rate-" + index).val();
        let product_sku = $(".product-sku-" + index).val();
        let product_image = $(".product-image-" + index).val();
    
        console.log("Quantity:", quantity);
        console.log("Title:", product_title);
        console.log("Price:", product_price);
        console.log("Price Without Gst:", product_price_wo_gst);
        console.log("gst_rate:", gst_rate);
        console.log("ID:", product_id);
        console.log("Image:", product_image);
        console.log("Sku:", product_sku);
        console.log("Index:", index);
        console.log("Current Element:", this_val);

        $.ajax({
            url: '/add-to-cart',
            data : {
                'id': product_id,
                'image': product_image,
                'qty': quantity,
                'title': product_title,
                'price': product_price,
                'price_wo_gst': product_price_wo_gst,
                'gst_rate': gst_rate,
                'sku' : product_sku,
            },
            dataType: 'json',
            beforeSend: function(){
                console.log("Adding Product to the cart...");
            },
            success: function(response){
                if(response.already_in_cart) {
                    // Show alert that product is already in the cart
                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'Product is already in your cart',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    // Show success alert and update cart
                    this_val.html("✓");
                    console.log("Added Product to cart!");
                    updateCartItemsList(response.data);
                    $(".cart-items-count").text(response.totalcartitems);
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Product has been added to your cart',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
    
        })
    })
});


// Update cart items list function
function updateCartItemsList(cartData) {
    var cartItemsList = $('.cart-drawer-items-list');
    cartItemsList.empty(); // Clear existing items
    
    var subtotalAmount = 0; // Initialize subtotal amount
    
    // Iterate over cart items and append them to the list
    $.each(cartData, function(productId, item) {
        var itemHtml = `
            <div class="cart-drawer-item d-flex position-relative">
                <div class="position-relative">
                    <img loading="lazy" class="cart-drawer-item__img" src="${item.image}" alt="${item.title}" />
                </div>
                <div class="cart-drawer-item__info flex-grow-1">
                    <a href="{% url 'core:product_new' item.title %}">
                        <h6 class="cart-drawer-item__title fw-normal">${item.title}</h6>
                    </a>  
                    <p class="cart-drawer-item__option text-secondary">Sku ID: ${item.sku}</p>
                    <div class="d-flex align-items-center justify-content-between mt-1">
                      <div class="position-relative">
                       <span>Qty:</span> <span class="cart-drawer-item__price money price" style="font-size: 1em;">${item.qty}</span>
                          <!-- <input type="number" name="quantity" value="${item.qty}" min="1"
                              class="qty-control__number border-0 text-center" />
                          <div class="qty-control__reduce text-start">-</div>
                          <div class="qty-control__increase text-end">+</div> -->
                      </div>
                      <span class="cart-drawer-item__price money price">₹ ${item.price}</span>
                  </div>
                </div>
                <button class="btn-close-xs position-absolute top-0 end-0 remove-cart delete-product" data-product="${productId}"></button>
            </div>`;
        cartItemsList.append(itemHtml);
        
        // Add item price to subtotal
        subtotalAmount += parseFloat(item.price);
    });

    // Update subtotal amount
    $('.cart-subtotal').text(`₹ ${subtotalAmount.toFixed(2)}`);
}

    
    
    $(document).ready(function(){
        $(".delete-product").on("click", function(){
            let product_id = $(this).attr("data-product");
            let this_val = $(this);
    
            console.log("Product ID:", product_id);
    
            // Display SweetAlert confirmation dialog
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // User confirmed the deletion, proceed with AJAX request
                    $.ajax({
                        url: "/delete-from-cart",
                        data: {
                            "id": product_id
                        },
                        dataType: "json",
                        beforeSend: function(){
                            this_val.hide();
                        },
                        success: function(response){
                            this_val.show();
                            $(".cart-items-count").text(response.totalcartitems);
                            $("#cart-list").html(response.data);
                        }
                    });
                }
            });
        });
    });
    

    $(document).ready(function(){
        $(".update-product").on("click", function(){
            let product_id = $(this).attr("data-product")
            let this_val = $(this)
            let product_quantity = $(".product-qty-"+product_id).val()
        
            console.log("Product ID:", product_id);
            console.log("Product Qty:", product_quantity);
    
            $.ajax({
                url: "/update-cart",
                data : {
                    "id": product_id,
                    "qty": product_quantity,
                },
                dataType: "json",
                beforeSend: function(){
                    this_val.hide()
                },
                success: function(response){
                    this_val.show()
                    $(".cart-items-count").text(response.totalcartitems)
                    $("#cart-list").html(response.data)
                }
            })
        })
    })

    