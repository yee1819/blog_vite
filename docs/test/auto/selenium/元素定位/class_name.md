用于Html文件中的class名来定位





示例

![image-20240808040628770](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202408080406528.webp)

```python
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# 初始化 Chrome 驱动
driver = webdriver.Chrome()

# 打开 Bilibili 网站
driver.get("http://bilibili.com")

driver.find_element(By.CLASS_NAME, "channel-link").click()

sleep(50)
# 关闭浏览器
driver.quit()
```

此时打开网站---番剧

![image-20240808040557517](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202408080405916.webp)



### 多个class时

但是如下图所见

![image-20240808040915385](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202408080409837.webp)

同一个class一般都会有许多的元素

如果使用`driver.find_element(By.CLASS_NAME, "channel-link")`会**默认返回第一个元素**，可以使用`driver.find_elements(By.CLASS_NAME, "channel-link")`返回所有匹配的元素

```python
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# 初始化 Chrome 驱动
driver = webdriver.Chrome()

# 打开 Bilibili 网站
driver.get("http://bilibili.com")

driver.maximize_window()
# 查找搜索输入框元素
link = driver.find_elements(By.CLASS_NAME, "channel-link")

for i  in link:
    i.click()
```

通过这个方法来全部点击

::: code-group

```python[输出每个元素]
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# 初始化 Chrome 驱动
driver = webdriver.Chrome()

# 打开 Bilibili 网站
driver.get("http://bilibili.com")

driver.maximize_window()
# 查找搜索输入框元素
link = driver.find_elements(By.CLASS_NAME, "channel-link")

for i  in link:
    print(i.text)
```

```yacas[元素]
番剧
电影
国创
电视剧
综艺
纪录片
动画
游戏
鬼畜
音乐
舞蹈
影视
娱乐
知识
科技
资讯
美食
生活
汽车
时尚
运动

```



:::

### 选择指定元素

也可以通过选择来指定想要的元素并打开

```python{15}
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# 初始化 Chrome 驱动
driver = webdriver.Chrome()

# 打开 Bilibili 网站
driver.get("http://bilibili.com")

driver.maximize_window()
# 查找搜索输入框元素
driver.find_elements(By.CLASS_NAME, "channel-link")[5].click()
```

![image-20240808041644714](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202408080416994.webp)

打开的是数组的第六个元素也就是[5]