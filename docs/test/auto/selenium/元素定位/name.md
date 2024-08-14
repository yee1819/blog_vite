# name定位



根据html文件中的name值定位

![image-20240808033813922](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202408080338164.webp)

例如：

```python{15}
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# 初始化 Chrome 驱动
driver = webdriver.Chrome()

# 打开 Bilibili 网站
driver.get("http://baidu.com")


# 输入搜索内容 "七月新番"
driver.find_element(By.NAME,"wd").send_keys("七月新番")
driver.find_element(By.ID,"su").click()
sleep(5)
```