node {
    def app
    def message
    def previosVersion = env.BUILD_NUMBER.toInteger()-1
    // def sendSlackNotification = { String str -> 
    //     sh """
    //         curl -X POST 
    //             --data-urlencode 
    //             'payload=
    //                 {
    //                     "channel": "#general",
    //                     "username": "webhookbot",
    //                     "text": "${str}",
    //                     "icon_emoji": ":jenkins_ci:"
    //                 }
    //             ' 
    //             https://hooks.slack.com/services/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
    //     """.replaceAll("\n", "")
    // }

    try{
        stage('Clone repository'){
            checkout scm
        }

        stage('Get npm packages'){
            sh 'npm i'
        }

        wrap([$class: 'Xvfb']) {
            stage('Test image'){
                sh 'npm run cypress:run:prod'
            }
        }

        // stage('Getting github message'){
        //     message = sh ( script: 'git log -1 --pretty=%B', returnStdout: true).trim();
        // }

        // stage('Slack notification build start'){
        //     sendSlackNotification("STARTED: Job ${env.JOB_NAME} [${env.BUILD_NUMBER}] \\n ${message}")
        // }

        stage('Build prod files'){
            sh 'npm run build'
        }

        stage('Remove old images'){
            sh 'docker rmi -f $(docker images |grep \'registry.hub.docker.com/josecordaz/docker_jenkins\')'
        }    

        stage('Build image'){
            app = docker.build("josecordaz/nutr_viry")
        }

        stage('Push image'){
            docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials'){
                app.push("${env.BUILD_NUMBER}")
                app.push("latest")
            }
        }

        stage('Stoping nutr_viry if any'){
            sh 'docker rm -f docker_jenkins_c'
        }

        stage('Starting nutr_viry container') {
            docker.image('josecordaz/docker_jenkins').run('--name docker_jenkins_c -p 8088:80 -d')
        }

        // stage('Slack notification build finished'){
        //     sendSlackNotification("FINISHED: Job ${env.JOB_NAME} [${env.BUILD_NUMBER}]");
        // }
    }catch(e){
        sendSlackNotification("There was an error :( => \\n ${e}")
    }
}
