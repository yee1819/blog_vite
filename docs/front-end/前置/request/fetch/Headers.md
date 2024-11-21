请求头 的一个实例

提供一些快速便捷操作请求头的方法

```javascript
interface Headers {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/append) */
    append(name: string, value: string): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/delete) */
    delete(name: string): void;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/get) */
    get(name: string): string | null;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/getSetCookie) */
    getSetCookie(): string[];
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/has) */
    has(name: string): boolean;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/set) */
    set(name: string, value: string): void;
    forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
}

declare var Headers: {
    prototype: Headers;
    new(init?: HeadersInit): Headers;
};

type HeadersInit = [string, string][] | Record<string, string> | Headers;
```

例子：

```javascript
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer token');

// 使用 Headers 对象
const request = new Request('https://api.example.com/data', {
  method: 'GET',
  headers,
});

fetch(request).then(response => console.log(response));

```



**关键方法：**

- `append(name, value)`：添加一个新的头部字段。
- `delete(name)`：删除指定的头部字段。
- `get(name)`：获取指定头部字段的值。
- `has(name)`：检查是否存在指定的头部字段。
- `set(name, value)`：设置头部字段的值（如果存在则覆盖）。
- .....