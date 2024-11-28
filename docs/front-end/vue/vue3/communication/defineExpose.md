# defineExpose

使用 `<script setup>` 的组件是**默认关闭**的——即通过模板引用或者 `$parent` 链获取到的组件的公开实例，**不会**暴露任何在 `<script setup>` 中声明的绑定。

通过defineExpose声明暴露的属性。

::: tip

`$parent`

当前组件可能存在的父组件实例，如果当前组件是顶层组件，则为 `null`。

```typescript
interface ComponentPublicInstance {
  $parent: ComponentPublicInstance | null
}
```



:::