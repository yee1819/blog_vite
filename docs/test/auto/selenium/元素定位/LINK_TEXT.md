根据连接的文本来定位，即a标签内的文本来定位



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
driver.find_element(By.LINK_TEXT,"番剧").click()
```





如果有多个文本一致，可以使用`find_elements`来定位，详情请见[多个元素时](./class_name#多个class时)





## 模糊查询

::: code-group

```python[模糊查“乐”]{15}
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
link = driver.find_elements(By.PARTIAL_LINK_TEXT,"乐")


for i in link:
    print(i.text)
```

```yacas[结果]
音乐
娱乐
三平安乐
```





:::