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

> 💡 **Quy ước:** signal/computed dùng `protected readonly` · `input`/`output` dùng `readonly` (**không** `protected`) · hàm template gọi dùng `protected` · thứ chỉ dùng nội bộ dùng `private`
>
> 💡 `readonly` khoá **cái hộp**, không khoá đồ bên trong: `this.todos = signal([])` ❌ · `this.todos.set([])` ✅
>
> 💡 Bỏ `readonly` khi phải gán lại bằng `=` hoặc `++`, ví dụ `private nextId = 4;` rồi `this.nextId++`

### ⚡ Signals (`@angular/core`)

| Hàm            | Tác dụng                                                      | Ví dụ                                      |
| -------------- | ------------------------------------------------------------- | ------------------------------------------ |
| `signal<T>(v)` | Tạo hộp chứa dữ liệu                                          | `signal<Todo[]>([])`                       |
| `x()`          | Đọc giá trị                                                   | `todos().length`                           |
| `x.set(v)`     | Thay bằng giá trị mới                                         | `title.set('Việc mới')`                    |
| `x.update(fn)` | Tính giá trị mới từ giá trị cũ                                | `todos.update(list => [...list, todo])`    |
| `computed(fn)` | Signal tự tính từ signal khác: tự cập nhật, có cache, chỉ đọc | `computed(() => this.todos().length >= 5)` |

> ⚠️ `update` phải trả về mảng/object **mới** (xem nhóm 🔁 bên dưới). Không dùng `push`, không gán trực tiếp kiểu `todo.done = true`.

### 🔁 Tạo mảng/object mới (dùng trong `update`)

| Cú pháp              | Tác dụng                                                      | Ví dụ                                                                         |
| -------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `list.map(fn)`       | Mảng mới, mỗi phần tử thay bằng kết quả của `fn`              | `list.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))` |
| `list.filter(fn)`    | Mảng mới, chỉ giữ phần tử mà `fn` trả về `true` (dùng để xoá) | `list.filter((todo) => todo.id !== id)`                                       |
| `{ ...obj, key: v }` | Object mới = copy `obj` rồi ghi đè (hoặc thêm) trường `key`   | `{ ...todo, done: true }`                                                     |

### 🧩 Component: `@Component({...})`

| Thuộc tính    | Tác dụng                          | Ví dụ                        |
| ------------- | --------------------------------- | ---------------------------- |
| `selector`    | Tên thẻ HTML của component        | `'app-todo-list'`            |
| `templateUrl` | File giao diện                    | `'./todo-list.html'`         |
| `styleUrl`    | File style                        | `'./todo-list.scss'`         |
| `imports`     | Những thứ template được phép dùng | `[RouterLink, RouterOutlet]` |

> ⚠️ Muốn dùng gì trong template thì phải khai báo **2 chỗ**: `import { ... } from '...'` ở đầu file **và** mảng `imports: [...]`.

### 🔌 Giao tiếp cha – con (`@angular/core`)

| Tên                   | Tác dụng                                                              | Ví dụ                                                                                   |
| --------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `input.required<T>()` | Cổng **nhận dữ liệu từ cha** (bắt buộc). Là signal: đọc bằng `todo()` | Con: `readonly todo = input.required<Todo>()` · Cha: `<app-todo-item [todo]="todo" />`  |
| `output<T>()`         | Cổng để **con báo lên cha**, `T` là kiểu dữ liệu gửi kèm              | Con: `readonly toggled = output<number>()` · Cha: `(toggled)="onTodoToggled($event)"`   |
| `x.emit(v)`           | Con phát tín hiệu kèm `v`; cha nhận `v` qua `$event`                  | `(click)="toggled.emit(todo().id)"`                                                     |
| `setInput(name, v)`   | Trong test: tự đóng vai cha, đưa giá trị vào input                    | `fixture.componentRef.setInput('todo', { id: 1, title: 'Learn Angular', done: false })` |

> ⚠️ Lỡ để `protected` cho `input` thì lỗi `TS2445` hiện ở template của **cha** (`todo-list.html`), không phải ở `todo-item.ts`. Riêng `output` để `protected` thì không báo lỗi, nhưng vẫn nên để public cho thống nhất.
>
> ⚠️ Trong test, `setInput` phải đặt **trước** `await fixture.whenStable()`, nếu không sẽ lỗi `NG0950` (input bắt buộc chưa có giá trị).
>
> 💡 Đặt tên output tránh trùng sự kiện có sẵn của trình duyệt (`click`, `toggle`...), ví dụ dùng `toggled`. Nếu trùng, Angular nghe cả output lẫn sự kiện thật, nên hàm của cha có thể chạy 2 lần.

### 🧭 Router (`@angular/router`)

| Tên                           | Tác dụng                                                                           | Ví dụ                                                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `Routes`                      | Danh sách route (`path` **không** có `/` ở đầu)                                    | `{ path: 'todos', component: TodoList }`                                                               |
| `:id` trong `path`            | Tham số: chỗ trống khớp mọi giá trị (`/todos/1`, `/todos/2`...)                    | `{ path: 'todos/:id', component: TodoDetail }`                                                         |
| `RouterOutlet`                | Khung hiển thị trang theo URL                                                      | `<router-outlet />`                                                                                    |
| `RouterLink`                  | Chuyển trang mà không tải lại                                                      | `<a routerLink="/todos">Todos</a>`                                                                     |
| `[routerLink]` (mảng)         | Link động: ghép các đoạn trong mảng thành URL                                      | `<a [routerLink]="['/todos', todo().id]">Chi tiết</a>`                                                 |
| `provideRouter()`             | Bật router cho app (trong `app.config.ts`)                                         | `provideRouter(routes)`                                                                                |
| `withComponentInputBinding()` | Đưa tham số trên URL vào `input` **cùng tên** của trang (giá trị luôn là `string`) | `provideRouter(routes, withComponentInputBinding())` · Trang: `readonly id = input.required<string>()` |
| `provideRouter([])`           | Dùng trong test có `RouterLink` để tránh lỗi `NG0201`                              | `providers: [provideRouter([])]`                                                                       |

> ⚠️ Tên `input` phải **giống hệt** tên tham số (`:id` ↔ `id`). Khác tên thì giá trị rỗng mà không báo lỗi.
>
> ⚠️ `[routerLink]` dạng mảng **bắt buộc** có ngoặc vuông. Thiếu thì link sai mà không báo lỗi.
>
> ⚠️ Component **chứa** component con dùng `RouterLink` thì test của nó cũng cần `provideRouter([])`, ví dụ `todo-list.spec.ts`.

### 🖥️ Render trên server (`@angular/ssr`, file `app.routes.server.ts`)

| Tên                    | Tác dụng                                                     | Ví dụ                                                  |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| `RenderMode.Prerender` | Vẽ sẵn trang **lúc build**                                   | `{ path: '**', renderMode: RenderMode.Prerender }`     |
| `RenderMode.Server`    | Vẽ trang **mỗi khi có người mở** (dùng cho route có tham số) | `{ path: 'todos/:id', renderMode: RenderMode.Server }` |

> ⚠️ Route có tham số mà để `Prerender` thì `npm run build` lỗi `getPrerenderParams is missing`, trong khi `npm start` không báo gì.
