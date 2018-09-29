# Database Testing

1. Giới thiệu
2. Tạo Factories
3. Resetting DB sau mỗi lần test
4. Viết Factories
    - Factory States (trạng thái factory)
    - Factory Callbacks (gọi lại factory)
5. Sử dụng Factories
    - Tạo models
    - Kiên trì models (Sau khi tạo, có thể tiếp tục thực hiện save, hoặc có thể tạo nhiều thể hiện model)
    - Relationships (Mối quan hệ)
6. Xác nhận khả dụng


## 1. Giới thiệu
Laravel cung cấp đa dạng các công cụ hữu dụng làm nó dễ dàng hơn để kiểm tra các ứng dụng cơ sở dữ liệu của bạn.
Đầu tiên, chúng ta có thể dùng hàm trợ giúp `assertDatabaseHas()` để xác nhận xem dữ liệu tồn tại trong cơ sở dữ liệu có phù hợp với 1 bộ tiêu chí nhất định không?.
Ví dụ: Nếu bạn muốn xác nhận rằng có 1 bản ghi trong bảng `Users` với trường `email` có giá trị là `sally@example.com`:
```
public function testDatabase()
{
    // Tạo một lời gọi đến ứng dụng...
    $this->assertDatabaseHas('users', [
        'email' => 'sally@example.com'
    ]);
}
```

- Methods helper:
    + assertDatabaseHas(): Xác nhận dữ liệu tồn tại trong cơ sở dữ liệu dựa theo 1 điều kiện lọc nào đó
    + assertDatabaseMissing(): Xác nhận dữ liệu không tồn tại trong cơ sở dữ liệu.
    ....
- Ngoài các methods trên thì chúng ta có thể dùng PHPUnit's built-in assertion methods

## 2. Tạo Factories
Để tạo factory, dùng lệnh artisan: `make:factory`:

```php artisan make:factory PostFactory```

Factory mới sẽ được tạo trong thư mục: database/factories/

Nếu muốn tạo factory và đồng thời cũng tạo luôn model thì thêm option tag: `--model`:
```php artisan make:factory PostFactory --model=Post```


## 3. Resetting DB

## 4. Viết Factories
Khi testing, bạn có thể cần thêm một vài bản ghi vào DB của bạn trước khi thực hiện test.
Thay vì việc thêm giá trị các cột một cách thủ công để test dữ liệu này, Laravel cho phép bạn định nghiã giá trị mặc định của các thuộc tính cho mỗi Eloquent Model của bạn bằng cách sử dụng model factories.
Để bắt đầu, hãy xem ở tệp tin trong ứng dụng của bạn `database/factories/UserFactory.php`:

```
user Faker\Generator as Faker;

$factory->define(App\User::class, function(Facker $faker) {
    return [
        'name' => $faker->name,
        'email' => $facker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10)
    ];
});
```

Trong Closure (callback function), mà một vài định nghĩa factory, bạn có thể trả về giá trị test mặc định của tất các các thuộc tính của model. Closure sẽ nhận một thể hiện của thư viện PHP `Faker ` mà sẽ cho phép bạn tạo dữ liệu tuỳ chọn (random) cho testing.

Bạn cũng có thể tạo thêm các tệp tin factory cho mỗi model để tổ chức được tốt hơn. Ví dụ, bạn có thể tạo các tệp tin `UserFactory` và `PostFactory` trong thư mục `database/factories/`. Tất cả các tệp tin trong thư mục `factories` sẽ tự động được tải (loaded) bởi Laravel.

### 4.1. Factory States (trạng thái factory)
Trạng thái cho phép bạn định nghĩa sửa đổi mô tả rằng có thể được áp dụng cho các mô hình factory ở trong bất kì một .
Ví dụ: `User` model của bạn có thể một trạng thái `delinquent` mà sửa đổi giá trị thuộc tính mặc định của nó. Bạn cũng có thể định nghĩa các chuyển đổi trạng thái của bạn bằng cách dùng phương thức `state`.

Tạm thời đến đây thôi. Khi nào tìm hiểu về testing sẽ dịch tiếp :D
