<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'imageName',
        'userId',
        'mapId',
        'description',
        'publishedOn'
    ];
    protected $dates = ['publishedOn'];

    /**
     * Posts are owned by a user
     *
     * @return Belong relation
     */
    public function user()
    {
        return $this->belongsTo('App\User', 'userId');
    }
}