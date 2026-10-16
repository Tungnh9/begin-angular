# BeginAngular

## 📒 Ghi chú: hàm và từ khoá quan trọng

### 🔐 Từ khoá trong class

| Từ khoá     | Tác dụng                                                   | Ví dụ                                                         |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------------------- |
| `public`    | Mặc định: ai cũng dùng được                                | `title = signal('')`                                          |
| `protected` | Class và template dùng được, component khác thì không      | `protected addSample() {}`                                    |
| `private`   | Chỉ dùng trong class, template **không** dùng được         | `private helper() {}`                                         |
| `readonly`  | Không gán lại được (chỉ dùng cho biến, không dùng cho hàm) | `protected readonly todos = signal([])`                       |
| `interface` | Mô tả hình dạng dữ liệu, TypeScript báo lỗi khi sai        | `interface Todo { id: number; title: string; done: boolean }` |

> 💡 **Quy ước:** signal/computed dùng `protected readonly` · hàm template gọi dùng `protected` · thứ chỉ dùng nội bộ dùng `private`
>
> 💡 `readonly` khoá **cái hộp**, không khoá đồ bên trong: `this.todos = signal([])` ❌ · `this.todos.set([])` ✅

### ⚡ Signals (`@angular/core`)

| Hàm            | Tác dụng                                                      | Ví dụ                                      |
| -------------- | ------------------------------------------------------------- | ------------------------------------------ |
| `signal<T>(v)` | Tạo hộp chứa dữ liệu                                          | `signal<Todo[]>([])`                       |
| `x()`          | Đọc giá trị                                                   | `todos().length`                           |
| `x.set(v)`     | Thay bằng giá trị mới                                         | `title.set('Việc mới')`                    |
| `x.update(fn)` | Tính giá trị mới từ giá trị cũ                                | `todos.update(list => [...list, todo])`    |
| `computed(fn)` | Signal tự tính từ signal khác: tự cập nhật, có cache, chỉ đọc | `computed(() => this.todos().length >= 5)` |

> ⚠️ `update` phải trả về mảng/object **mới**, ví dụ `[...list, todo]`. Không dùng `push`.

### 🧩 Component: `@Component({...})`

| Thuộc tính    | Tác dụng                          | Ví dụ                        |
| ------------- | --------------------------------- | ---------------------------- |
| `selector`    | Tên thẻ HTML của component        | `'app-todo-list'`            |
| `templateUrl` | File giao diện                    | `'./todo-list.html'`         |
| `styleUrl`    | File style                        | `'./todo-list.scss'`         |
| `imports`     | Những thứ template được phép dùng | `[RouterLink, RouterOutlet]` |

> ⚠️ Muốn dùng gì trong template thì phải khai báo **2 chỗ**: `import { ... } from '...'` ở đầu file **và** mảng `imports: [...]`.

### 🧭 Router (`@angular/router`)

| Tên                 | Tác dụng                                              | Ví dụ                                    |
| ------------------- | ----------------------------------------------------- | ---------------------------------------- |
| `Routes`            | Danh sách route (`path` **không** có `/` ở đầu)       | `{ path: 'todos', component: TodoList }` |
| `RouterOutlet`      | Khung hiển thị trang theo URL                         | `<router-outlet />`                      |
| `RouterLink`        | Chuyển trang mà không tải lại                         | `<a routerLink="/todos">Todos</a>`       |
| `provideRouter()`   | Bật router cho app (trong `app.config.ts`)            | `provideRouter(routes)`                  |
| `provideRouter([])` | Dùng trong test có `RouterLink` để tránh lỗi `NG0201` | `providers: [provideRouter([])]`         |
