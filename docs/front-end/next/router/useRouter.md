



与react的用法基本一致

```js
import { useRouter } from 'next/router';
import Link from 'next/link'
const Post = () => {
    const router = useRouter();
    const id = router.query.id; // 获取动态路由中的 `id`
    console.log(router.query)
    return (
        <div>
            <h1>Post</h1>
            <p>This is post {id}</p>
            <Link href="/">
                Back to home
            </Link>
        </div>
    );
}

export default Post;

```

