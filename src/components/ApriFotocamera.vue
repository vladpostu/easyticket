<template>
    <button @click="apriFotocamera">Scannerizza QR Code</button>
    <div>
        <video v-if="scanning" ref="video" autoplay playsinline=""></video>
    <canvas style="display: none;" ref="canvas"></canvas>
    <div v-if="qrContent">
        {{  qrContent  }}
    </div>
    </div>
</template>

<script>
import jsQR from 'jsqr';

export default {
    name: "ApriFotocamera",
    data() {
        return {
            stream: null,
            qrContent: "",
            scanning: false,
        }
    },
    emits: ["emitQRCode"],
    async mounted() {
        
    },
    methods: {
        async apriFotocamera() {
            try {
                this.scanning = true;
                
                this.$nextTick(() => {
                    this.scanQR();
                })

                this.stream = await navigator.mediaDevices.getUserMedia({
                    video: {facingMode: "environment"}
                });
                this.$refs.video.srcObject = this.stream;
                
            } catch(error) {
                console.error(error)
            }
        },
        async scanQR() {
            const video = this.$refs.video;
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext("2d");

            const scan = () => {
                if(!this.scanning) return;

                if(video.readyState === video.HAVE_ENOUGH_DATA) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);

                    if (code) {
                        this.$emit("emitQRCode", code.data);
                        this.scanning = false;
                        this.stopCamera();
                    }
                }

                requestAnimationFrame(scan);
            }

            scan();
        },
        stopCamera() {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
        }
    },
    beforeUnmount() {
        this.stopCamera()
    }
}
</script>