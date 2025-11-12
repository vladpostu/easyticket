
<template>
  <div class="scanner-container">
    <button
      class="btn-scan"
      @click="apriFotocamera"
      :disabled="scanning"
    >
      {{ scanning ? "Scansione in corso..." : "Scannerizza QR Code" }}
    </button>

    <div class="video-wrapper" v-if="scanning">
      <video ref="video" autoplay playsinline></video>
      <div class="scan-overlay"></div>
    </div>

    <canvas ref="canvas" class="hidden-canvas"></canvas>

    <div v-if="qrContent" class="qr-result">
      <p>QR Rilevato:</p>
      <div class="code">{{ qrContent }}</div>
    </div>
  </div>
</template>

<style scoped>
.scanner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

/* BOTTONE SCANSIONE */
.btn-scan {
  background-color: #0C2B4E;
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 10px;
  padding: 12px 30px;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 1rem;
}

.btn-scan:hover {
  background-color: #174170;
}

.btn-scan:disabled {
  background-color: #5a6a82;
  cursor: not-allowed;
}

/* AREA VIDEO */
.video-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 25px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

/* OVERLAY DI SCANSIONE */
.scan-overlay {
  position: absolute;
  inset: 0;
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

/* RISULTATO QR */
.qr-result {
  margin-top: 25px;
  text-align: center;
  background-color: #f8f9fa;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.qr-result p {
  font-weight: 600;
  color: #0C2B4E;
  margin-bottom: 8px;
}

.qr-result .code {
  font-family: monospace;
  background-color: #e9ecef;
  padding: 8px 12px;
  border-radius: 6px;
  color: #333;
  max-width: 260px;
  word-break: break-all;
}

/* CANVAS NASCOSTO */
.hidden-canvas {
  display: none;
}

@media (max-width: 500px) {
  .video-wrapper {
    width: 260px;
    height: 260px;
  }

  .btn-scan {
    padding: 10px 24px;
    font-size: 0.95rem;
  }
}
</style>

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