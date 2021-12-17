# atlasdemo
Atlas CRUD

#### Env File
.env 파일 생성

MongoDB 접근 정보 및 사용할 Database 지정    
````
MONGODB=mongodb://USER_ID:PASSWORD@cluster1.5qjlg.mongodb.net/admin?retryWrites=true&w=majority
DATABASE=DATABASENAME
````
MongoDB Atlas 를 사용 하는 경우는 다음과 같습니다
````
MONGODB=mongodb+srv://USER_ID:PASSWORD@cluster1.5qjlg.mongodb.net/admin?retryWrites=true&w=majority
DATABASE=DATABASENAME
````

#### Local Node test 

`````
$ npm install
$ npm install -D nodemon
$ npm start
`````

#### GET
````
curl --location --request GET 'http://localhost:3000/handson' \
--header 'Content-Type: application/json'
````

#### POST
`````
curl --location --request POST 'http://localhost:3000/handson' \
--header 'Content-Type: application/json' \
--data-raw '{
        "ssn": "123-001-0000",
        "address": {
            "street": "Seoul Jongro-gu, Sejon-ru ",
            "city": "Seoul",
            "zip": 123142
        },
        "name": {
            "firstName":"Jon",
            "lastName" : "Doe"
        },
        "phone": "010-2345-9999"
    }'
`````

#### Docker Build
`````
$ docker build -t nodeserver:3.3 .  
$ docker tag nodeserver:3.3  gcr.io/{Project_ID}/nodeserver:3.3 
$ docker push gcr.io/{Project_ID}/nodeserver:3.3 
`````

#### Kubernetes POD 배포
/kubernetes/deployment.yaml 의 
spec.template,spec.containers.image 의 값에 사용하고 있는 container registry 와 이미지 이름을 넣습니다. (예: gcr.io/mygoogleproject/nodeserver:3.3)

`````
$ kubectl apply -f ./kubernetes/deployments.yaml
$ kubectl apply -f ./kubernetes/services.yaml
$ kubectl get svc vuejsui -n mongodb 
NAME          TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)          AGE
node-server   LoadBalancer   10.96.245.222   146.56.###.###   3000:31294/TCP   4d13h
`````

External-IP 로 API 를 테스트 합니다
````
curl --location --request GET 'http://146.56.###.###:3000/handson' \
--header 'Content-Type: application/json'
````
