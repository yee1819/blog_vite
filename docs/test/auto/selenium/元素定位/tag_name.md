html文件中的标签名来定位

例如：

![image-20240808042335386](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202408080424427.webp)

```python
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# 初始化 Chrome 驱动
driver = webdriver.Chrome()

# 打开 Bilibili 网站
driver.get("http://baidu.com")


driver.find_element(By.TAG_NAME, "area").click()
```



效果：

![image-20240808042546138](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202408080425547.webp)