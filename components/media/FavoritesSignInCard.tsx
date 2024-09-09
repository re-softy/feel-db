import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

function FavoritesSignInCard() {
    return (
        <div className="p-8 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-4 text-center">
                <BookmarkAddIcon fontSize='large' />
                <h3 className="text-xl font-semibold">Sign in to access your favourites</h3>
                <p className="text-md">Save shows and movies to keep track of what you want to watch</p>
                <button className="mt-6 bg-[#ff7f50] text-white px-6 py-2 rounded-full hover:bg-orange-300">
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default FavoritesSignInCard;