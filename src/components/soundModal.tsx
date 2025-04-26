export default function SoundModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-70">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">소리 켜기</h2>
                <p>사이트에서 소리를 들으려면 아래 버튼을 눌러주세요!</p>
                <button
                    onClick={() => {
                        onClose();
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    소리 켜기
                </button>
            </div>
        </div>
    );
}