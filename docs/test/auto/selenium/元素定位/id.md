根据Html中的id定位元素



例如![image-20240808034432929](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202408080344130.webp)



```python
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# 初始化 Chrome 驱动
driver = webdriver.Chrome()

# 打开 Bilibili 网站
driver.get("http://baidu.com")


# 查找搜索输入框元素并输入搜索内容 "七月新番"
driver.find_element(By.ID, "kw").send_keys("七月新番")

# 查找搜索按钮元素并点击
driver.find_element(By.ID, "su").click()

# 等待搜索结果加载
sleep(5)
```