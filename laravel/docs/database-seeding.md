# 🏬 Database: Seeding

1. Giới thiệu
2. Viết Seeders
    - Sử dụng Seeder với Model Factories
    - Gọi nhiều Seeders (Chạy nhiều seeder)
3. Chạy Seeders

## 1. Giới thiệu
Laravel bao gồm một phương thức đơn giản để tạo DB với dữ liệu thử nghiệm dùng seed classes.
Tất cả những seed classes là được lưu trong thư mục ***`database/seeds`***.
Seed classes có thể có bất kỳ tên nào mà bạn muốn nhưng có lẽ nên theo một vài quy ước hợp lý, như ***`UsersTableSeeder`***, vân vân ...
Bởi mặc định, một ***`DatabaseSeeder`*** class là được định nghĩa cho bạn. Từ class này bạn có thể dùng phương thức ***`call`*** để chạy những seed classes khác, cho phép bạn có thể điều khiển được thứ tự seeding.

## 2. Viết Seeders
Để tạo một seeder, thực hiện lệnh artisan ***`make:seeder`***. Tất cả các seeders được tạo bởi framework sẽ được đặt trong thư mục ***`database/seeds`***:

```sh
php artisan make:seeder UsersTableSeeder
```

Một seeder classes chỉ chứa một phương thức bởi mặc định: ***`run`***. Phương thức này là được gọi khi lệnh artisan ***`db:seed`*** được thực thi.
Trong phương thức ***`run`***, bạn có thể thêm dữ liệu DB của bạn. Tuy nhiên bạn muốn, bạn có thể dùng ***`query buider`*** để thêm thủ công các dữ liệu hoặc bạn cũng có thể dùng ***`Eloquent model factories`***.

Như một ví dụ, hãy sửa đổi ***`DatabaseSeeder`*** class mặc định và thêm một database chèn câu lệnh vào phương thức ***`run`***:

```php
<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => str_random(10),
            'email' => str_random(10).'@gmail.com',
            'password' => bcrypt('secret'),
        ]);
    }
}
?>
```

### 2.1 Sử dụng Seeder với Model Factories
Tất nhiên, chỉ định thủ công thuộc tính mỗi một model seed là rườm rà. Thay thế, bạn có thể dùng ***`model factories`*** để thuận tiện (conveniently) tạo số lượng lớn bản ghi DB. Đầu tiên, xem ***`model factory documentation`*** để học cách định nghĩa các factories.
Cùng một lúc bạn có thể định nghĩa nhiều factories, bạn có thể dùng `factory` helper function để thêm bản ghi vào trong DB.

Ví dụ, Chúng ta hãy tạo 50 users và đính kèm một mối quan hệ (relationship) cho mỗi user:

```php
/**
 * Run the database seeds
 *
 * @return void
 */
public function run()
{
    factory(App\User::class, 50)->create()->each(function ($u) {
        $u->posts()->save(factory(App\Post::class)->make());
    })
}
```

### 2.2 Gọi nhiều Seeders (Chạy nhiều seeder)
Trong ***`DatabaseSeeder`*** class, bạn có thể dùng phương thức ***`call`*** để thực hiện thêm các seed classes.
Dùng phương thức ***`call`*** cho phép bạn chia nhỏ DB seeding thành nhiều tệp tin bởi để không có một seeder class đơn lẻ trở lên vô cùng lớn (overwhelmingly large).
Qua tên seeder class mà bạn muốn chạy:

```php
/**
 * Run the database seeds
 *
 * @return void
 */
public function run()
{
    $this->call([
        UsersTableSeeder::class,
        PostsTableSeeder::class,
        CommentsTableSeeder::class,
    ]);
}
```

## 3. Chạy Seeders
Mỗi lần bạn viết seeder, bạn có thể cần tạo ***`Composer's autoloader`*** sử dụng lệnh ***`dump-autoload`***:

```sh
composer dump-autoload
```

Bây giờ bạn có thể dùng lệnh artisan ***`db:seed`*** để seed DB của bạn (tạo dữ liệu mẫu). 
Theo mặc định, lệnh `db:seed` chạy ***`DatabaseSeeder`*** class, mà cũng có thể dùng để chạy các seeder class khác bằng cách dùng lựa chọn ***`--class=`*** để chỉ định rõ seeder class để chạy riêng lẻ:

```sh
php artisan db:seed

php artisan db:seed --class=UsersTableSeeder
```

Bạn cũng có thể seed DB (tạo dữ liệu mẫu) bằng cách dùng lệnh ***`migrate:refresh`***, mà cũng sẽ rollback (trở lại) và re-run (chạy lại) tất cả migrations của bạn. Lệnh này hữu dụng cho việc hoàn thành xậy dựng lại DB của bạn:

```sh
php artisan migrate:refresh --seed
```