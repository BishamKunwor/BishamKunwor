export default function devlog<T>(message: T, ...data: any[]) {
  console.log(message, ...data);
}
