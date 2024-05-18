import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Skeleton,
} from "antd";

const { Meta } = Card;

function App() {
  const [flowers, setFlowers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const onFinish = async (values) => {
    console.log(values);

    const mainImageUrl = values.main_image.file.response.image_url.url;
    if (!mainImageUrl) {
      console.error("Main image URL not found");
      return;
    }

    const newFlower = {
      title: values.title,
      price: values.price,
      main_image: mainImageUrl,
      discount: false,
      discount_price: "0",
      detailed_images: [
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169512/743847/5965__41958.1630728740.jpg?c=2",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169089/743279/5493__27309.1630683935.jpg?c=2",
      ],
      rate: 0,
      views: 0,
      tags: [],
      comments: [],
      short_description: "Short description",
      description: "Description",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/potter-plants?access_token=64bebc1e2c6d3f056a8c85b7",

        {
          method: "POST",
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFlower),
        }
      );

      if (response.ok) {
        const createdFlower = await response.json();
        setFlowers((prevFlowers) => [...prevFlowers, createdFlower.data]);
        setOpen(false);
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7"
      );

      const data = await response.json();
      setFlowers(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white flex m-auto gap-[20px] mt-[20px]">
      <Modal
        okText="Create"
        onOk={() => setOpen(false)}
        visible={open}
        onCancel={() => setOpen(false)}
        title="Add Flower"
        footer={false}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Upload"
            name="main_image"
            rules={[
              {
                required: true,
                message: "Please upload your image!",
              },
            ]}
          >
            <Upload
              name="image"
              action="http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button danger onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button htmlType="submit">Create</Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="absolute top-2 right-10">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <div className="box flex m-auto flex-col gap-[20px] mt-[20px]">
        {loading ? (
          <>
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton active paragraph={{ rows: 1 }} />
          </>
        ) : (
          flowers.map(({ _id, main_image, title, short_description }) => (
            <Card
              key={_id}
              hoverable
              style={{
                width: 440,
              }}
              cover={<img alt="example" src={main_image} />}
            >
              <Meta title={title} description={short_description} />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
