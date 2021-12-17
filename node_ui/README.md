## MongoDB Atlas Web application UI Server

#### Feature and components
This UI web application is Vue.js based web application. It connects to nodeserver API and communicate with Json message.

#### Node API Address
main.js 의 axios.defaults.baseURL 값으로 node_apiserver 주소를 지정 하여 줍니다.

#### Docker Build
`````
$ docker build -t vuejsui:1.0 .  
$ docker tag vuejsui:1.0  gcr.io/{Project_ID}/vuejsui:1.0 
$ docker push gcr.io/{Project_ID}/vuejsui:1.0 
`````


#### Kubernetes POD 배포
/kubernetes/deployment.yaml 의 
spec.template,spec.containers.image 의 값에 사용하고 있는 container registry 와 이미지 이름을 넣습니다. (예: gcr.io/mygoogleproject/vuejsui:1.0)

`````
$ kubectl apply -f ./kubernetes/deployment.yaml
$ kubectl apply -f ./kubernetes/services.yaml
$ kubectl get svc vuejsui -n mongodb 
NAME      TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
vuejsui   LoadBalancer   10.96.129.16   146.56.###.###   80:32078/TCP   3d23h
`````

External-IP 를 이용하여 접근 합니다.